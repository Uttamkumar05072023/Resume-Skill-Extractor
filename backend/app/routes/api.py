from fastapi import APIRouter, HTTPException, UploadFile, File
from ..controllers.user_controller import UserController
from ..models.user import User
import shutil # Import shutil to handle file saving
import os # Import os for path manipulation
import fitz  # Import PyMuPDF
import re # Import re for regular expressions
import spacy # Import spacy

router = APIRouter()

# Load the spaCy model
# This loads the model once when the module is imported
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    print("Downloading spaCy model 'en_core_web_sm'...")
    from spacy.cli import download
    download("en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

@router.get("/users", response_model=list[User])
def get_users():
    return UserController.get_users()

@router.get("/users/{user_id}", response_model=User)
def get_user(user_id: int):
    user = UserController.get_user(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/users", response_model=User)
def create_user(user: User):
    return UserController.create_user(user)

@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    try:
        # Define the path to save the uploaded file temporarily
        upload_folder = "./uploaded_files"
        os.makedirs(upload_folder, exist_ok=True)
        file_path = os.path.join(upload_folder, file.filename)

        # Save the uploaded file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Extract text using PyMuPDF or read text file
        text = ""
        if file.filename.lower().endswith('.pdf'):
            try:
                with fitz.open(file_path) as doc:
                    for page in doc:
                        text += page.get_text()
            except Exception as e:
                print(f"Could not process PDF file {file.filename} with PyMuPDF: {e}")
                os.remove(file_path)
                return {"filename": file.filename, "skills": []}
        elif file.filename.lower().endswith('.txt'):
             with open(file_path, 'r', encoding='utf-8') as f:
                 text = f.read()
        else:
             print(f"Unsupported file type: {file.filename}")
             os.remove(file_path)
             return {"filename": file.filename, "skills": []}

        # Find the skills section based on the header
        # Refined regex to look for specific section headers after skills
        # Updated regex to capture the entire skills block until the next major section header
        skills_section_match = re.search(r'SKILLS\s*\n(.*?)(?:\n(?:EXPERIENCE|EDUCATION|PROJECTS|AWARDS|CERTIFICATIONS|PUBLICATIONS|INTERESTS|REFERENCES).*|$)', text, re.DOTALL | re.IGNORECASE)
        skills_text = ""
        if skills_section_match:
            skills_text = skills_section_match.group(1).strip()
        else:
            # If skills section header is not found, try to extract from the whole text (fallback)
            skills_text = text

        # Use spaCy for skill extraction on the skills_text
        doc = nlp(skills_text)
        extracted_skills = []

        # Example: Extract noun chunks as potential skills
        # You might need a more sophisticated method based on your needs
        potential_skills = [chunk.text for chunk in doc.noun_chunks]

        # You can optionally filter or match these against a known list of skills
        known_skills = ["Python", "React", "FastAPI", "Tailwind CSS", "JavaScript", "HTML", "CSS", "SQL", "Docker", "Git", "Agile", "NLP", "Machine Learning", "Data Science", "Computer Vision", "Web Development", "C", "C++", "numpy", "pandas", "matplotlib", "seaborn", "scikit-learn", "streamlit", "tkinter", "Data Analysis", "MySQL"]

        # Simple matching of potential skills/tokens against a known list
        # This part can be made more intelligent (e.g., fuzzy matching)
        processed_skills_text_lower = skills_text.lower()
        for skill in known_skills:
            # Use regex to find the skill as a whole word in the skills section
            if re.search(r'\b' + re.escape(skill.lower()) + r'\b', processed_skills_text_lower):
                 extracted_skills.append(skill)

        # You could also look at named entities, but 'en_core_web_sm' is basic
        # for ent in doc.ents:
        #     if ent.label_ in ["ORG", "PRODUCT", "LANGUAGE"]:
        #         extracted_skills.append(ent.text)

        # Remove duplicates and return
        unique_skills = list(set(extracted_skills))

        # Clean up the temporary file
        os.remove(file_path)

        return {"filename": file.filename, "skills": unique_skills}
    except Exception as e:
        # Ensure the temporary file is removed even if an error occurs
        if os.path.exists(file_path):
             os.remove(file_path)
        # Log the detailed error on the backend side
        print(f"An error occurred during processing: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing file: {e}") 
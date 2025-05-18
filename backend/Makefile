.PHONY: check-python setup-venv install-deps check-node check-railway check-auth check-config run-local deploy open-browser clean

# Required versions
PYTHON_VERSION := 3.11.0
NODE_VERSION := v22.13.1

# Detect OS
ifeq ($(OS),Windows_NT)
    DETECTED_OS := Windows
    PYTHON := python
    VENV := venv
    VENV_ACTIVATE := .\venv\Scripts\activate
    VENV_CREATE := python -m venv venv
    OPEN_CMD := start
else
    DETECTED_OS := $(shell uname)
    PYTHON := python3
    VENV := venv
    VENV_ACTIVATE := . venv/bin/activate
    VENV_CREATE := python3 -m venv venv
    ifeq ($(DETECTED_OS),Darwin)
        OPEN_CMD := open
    else
        OPEN_CMD := xdg-open
    endif
endif

clean:
	@echo "\n🧹 Cleaning up unnecessary files..."
	@if [ -d "venv" ]; then \
		echo "Removing virtual environment..."; \
		rm -rf venv; \
	fi
	@if [ -d "node_modules" ]; then \
		echo "Removing node_modules..."; \
		rm -rf node_modules; \
	fi
	@if [ -d "__pycache__" ]; then \
		echo "Removing Python cache..."; \
		rm -rf __pycache__; \
	fi
	@echo "\n✅ Cleanup complete!"

check-python:
	@echo "\n🔍 Checking Python installation..."
	@if ! command -v $(PYTHON) >/dev/null 2>&1; then \
		echo "\n❌ ERROR: Python is not installed!"; \
		echo "\n📥 Please install Python from: https://www.python.org/downloads/"; \
		echo "\n⚠️  To continue anyway, type 'force' and press Enter:"; \
		read input; \
		if [ "$$input" != "force" ]; then \
			echo "\n❌ Operation cancelled. Please install Python first."; \
			exit 1; \
		fi; \
	else \
		echo "\n✅ Python is installed!"; \
	fi

setup-venv: check-python
	@echo "\n🔧 Setting up Python virtual environment..."
	@if [ ! -d "$(VENV)" ]; then \
		echo "\n📦 Creating virtual environment..."; \
		$(VENV_CREATE); \
		echo "\n✅ Virtual environment created!"; \
	else \
		echo "\n✅ Virtual environment already exists!"; \
	fi

install-deps: setup-venv
	@echo "\n📦 Installing Python dependencies..."
	@if [ "$(DETECTED_OS)" = "Windows" ]; then \
		.\venv\Scripts\pip install -r requirements.txt; \
	else \
		. venv/bin/activate && pip install -r requirements.txt; \
	fi
	@echo "\n✅ Dependencies installed successfully!"

check-node:
	@echo "\n🔍 Checking Node.js version..."
	@if ! command -v node >/dev/null 2>&1; then \
		echo "\n❌ ERROR: Node.js is not installed!"; \
		echo "\n📥 Please install Node.js from: https://nodejs.org/"; \
		echo "\n⚠️  To continue anyway, type 'force' and press Enter:"; \
		read input; \
		if [ "$$input" != "force" ]; then \
			echo "\n❌ Operation cancelled. Please install Node.js first."; \
			exit 1; \
		fi; \
	elif [ "$$(node -v)" != "$(NODE_VERSION)" ]; then \
		echo "\n⚠️  WARNING: Node.js version mismatch!"; \
		echo "   Current version: $$(node -v)"; \
		echo "   Required version: $(NODE_VERSION)"; \
		echo "\n📥 Please install Node.js $(NODE_VERSION) from: https://nodejs.org/"; \
		echo "   Or use nvm: nvm install $(NODE_VERSION) && nvm use $(NODE_VERSION)"; \
		echo "\n⚠️  To continue anyway, type 'force' and press Enter:"; \
		read input; \
		if [ "$$input" != "force" ]; then \
			echo "\n❌ Operation cancelled. Please install the correct Node.js version."; \
			exit 1; \
		fi; \
	else \
		echo "\n✅ Node.js version check passed!"; \
	fi

check-railway: check-node
	@echo "\n🔍 Checking Railway CLI..."
	@if [ ! -f "package.json" ]; then \
		echo "\n📦 Initializing npm project..."; \
		npm init -y; \
	fi
	@if ! npm list @railway/cli >/dev/null 2>&1; then \
		echo "\n📦 Installing Railway CLI locally..."; \
		npm install --save-dev @railway/cli; \
		echo "\n✅ Railway CLI installed locally!"; \
	else \
		echo "\n✅ Railway CLI is already installed locally!"; \
	fi

check-auth: check-railway
	@echo "\n🔍 Checking Railway authentication..."
	@if ! npx @railway/cli whoami >/dev/null 2>&1; then \
		echo "\n❌ Not logged in to Railway!"; \
		echo "\n📝 Attempting to login to Railway..."; \
		echo "\n📝 If browser login fails, you'll be prompted for a token."; \
		echo "   Get your token from: https://railway.app/token"; \
		echo "\n⏳ Opening browser for authentication..."; \
		if ! npx @railway/cli login; then \
			echo "\n⚠️  Browser login failed. Trying browserless login..."; \
			echo "\n📝 Please enter your Railway token:"; \
			read token; \
			if ! npx @railway/cli login --token "$$token"; then \
				echo "\n❌ Login failed. Please check your token and try again."; \
				exit 1; \
			fi; \
		fi; \
		echo "\n✅ Successfully logged in to Railway!"; \
	else \
		echo "\n✅ Already logged in to Railway!"; \
	fi

check-config: check-auth
	@echo "\n🔍 Checking Railway configuration..."
	@if [ ! -f "railway.json" ]; then \
		echo "\n❌ ERROR: railway.json configuration file is missing!"; \
		echo "\n📝 Creating default configuration..."; \
		echo "{" > railway.json; \
		echo "  \"\$$schema\": \"https://railway.app/railway.schema.json\"," >> railway.json; \
		echo "  \"build\": {" >> railway.json; \
		echo "    \"builder\": \"NIXPACKS\"," >> railway.json; \
		echo "    \"buildCommand\": \"pip install -r requirements.txt\"" >> railway.json; \
		echo "  }," >> railway.json; \
		echo "  \"deploy\": {" >> railway.json; \
		echo "    \"startCommand\": \"uvicorn app.main:app --host 0.0.0.0 --port \$$PORT\"," >> railway.json; \
		echo "    \"healthcheckPath\": \"/docs\"," >> railway.json; \
		echo "    \"healthcheckTimeout\": 300," >> railway.json; \
		echo "    \"restartPolicyType\": \"ON_FAILURE\"," >> railway.json; \
		echo "    \"restartPolicyMaxRetries\": 10" >> railway.json; \
		echo "  }," >> railway.json; \
		echo "  \"language\": \"python\"" >> railway.json; \
		echo "}" >> railway.json; \
		echo "\n✅ Created railway.json with default configuration!"; \
	else \
		echo "\n✅ Railway configuration found!"; \
	fi

open-browser:
	@echo "\n🌐 Opening API documentation in browser..."
	@if [ "$(DETECTED_OS)" = "Windows" ]; then \
		start http://localhost:3001/docs; \
	elif [ "$(DETECTED_OS)" = "Darwin" ]; then \
		open http://localhost:3001/docs; \
	else \
		xdg-open http://localhost:3001/docs; \
	fi

run-local: install-deps
	@echo "\n🚀 Starting FastAPI development server..."
	@echo ""
	@echo "════════════════════════════════════════════"
	@echo "            📝 IMPORTANT INFO              "
	@echo "════════════════════════════════════════════"
	@echo " 🔗 API URL :      http://localhost:3001     "
	@echo " 📘 Docs Here :    http://localhost:3001/docs "
	@echo "════════════════════════════════════════════"
	@echo "\n⏳ Starting server..."
	@if [ "$(DETECTED_OS)" = "Windows" ]; then \
		.\venv\Scripts\uvicorn app.main:app --reload --port 3001; \
	else \
		. venv/bin/activate && uvicorn app.main:app --reload --port 3001; \
	fi

deploy: check-config
	@echo "\n🚀 Starting deployment process..."
	@echo "\n📝 Would you like to:"
	@echo "1) Create a new Railway project"
	@echo "2) Deploy to an existing project"
	@read -p "Enter your choice (1 or 2): " choice; \
	if [ "$$choice" = "1" ]; then \
		echo "\n📝 Creating new project..."; \
		npx @railway/cli init; \
		echo "\n⏳ Deploying to Railway (this may take a few minutes)..."; \
		npx @railway/cli up --ci; \
		echo "\n📝 Exposing service..."; \
		npx @railway/cli service; \
		echo "\n🌐 Getting deployment URL..."; \
		DEPLOY_URL=$$(npx @railway/cli domain | grep -o 'https://[^ ]*'); \
		if [ -z "$$DEPLOY_URL" ]; then \
			echo "\n⚠️  Could not get deployment URL automatically."; \
			echo "Please visit your Railway dashboard to get the URL:"; \
			echo "https://railway.app/dashboard"; \
		else \
			echo "\n✅ Deployment successful!"; \
			echo "\n📝 Your API is now available at:"; \
			echo "   • API URL: $$DEPLOY_URL"; \
			echo "   • API Documentation: $$DEPLOY_URL/docs"; \
			echo "\n⏳ Opening API documentation in browser..."; \
			if [ "$(DETECTED_OS)" = "Windows" ]; then \
				start "$$DEPLOY_URL/docs"; \
			elif [ "$(DETECTED_OS)" = "Darwin" ]; then \
				open "$$DEPLOY_URL/docs"; \
			else \
				xdg-open "$$DEPLOY_URL/docs"; \
			fi; \
		fi; \
	else \
		echo "\n📝 Available Railway projects:"; \
		npx @railway/cli list; \
		read -p "Enter the project name to deploy to: " PROJECT_NAME; \
		echo "\n📝 Deploying to project $$PROJECT_NAME..."; \
		npx @railway/cli link --project "$$PROJECT_NAME"; \
		echo "\n⏳ Deploying to Railway (this may take a few minutes)..."; \
		npx @railway/cli up --ci; \
		echo "\n📝 Exposing service..."; \
		npx @railway/cli service; \
		echo "\n🌐 Getting deployment URL..."; \
		DEPLOY_URL=$$(npx @railway/cli domain | grep -o 'https://[^ ]*'); \
		if [ -z "$$DEPLOY_URL" ]; then \
			echo "\n⚠️  Could not get deployment URL automatically."; \
			echo "Please visit your Railway dashboard to get the URL:"; \
			echo "https://railway.app/dashboard"; \
		else \
			echo "\n✅ Deployment successful!"; \
			echo "\n📝 Your API is now available at:"; \
			echo "   • API URL: $$DEPLOY_URL"; \
			echo "   • API Documentation: $$DEPLOY_URL/docs"; \
			echo "\n⏳ Opening API documentation in browser..."; \
			if [ "$(DETECTED_OS)" = "Windows" ]; then \
				start "$$DEPLOY_URL/docs"; \
			elif [ "$(DETECTED_OS)" = "Darwin" ]; then \
				open "$$DEPLOY_URL/docs"; \
			else \
				xdg-open "$$DEPLOY_URL/docs"; \
			fi; \
		fi; \
	fi 
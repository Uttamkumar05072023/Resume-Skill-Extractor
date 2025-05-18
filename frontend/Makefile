.PHONY: check-node install-deps run-local deploy

# Required Node version
NODE_VERSION := v22.13.1

# Detect OS
ifeq ($(OS),Windows_NT)
    DETECTED_OS := Windows
else
    DETECTED_OS := $(shell uname)
endif

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

check-port:
	@echo "\n🔍 Checking if port 3000 is available..."
	@if [ "$(DETECTED_OS)" = "Windows" ]; then \
		echo "\nℹ️  Windows detected. Using port 3000..."; \
	elif [ "$(DETECTED_OS)" = "Darwin" ]; then \
		echo "\nℹ️  macOS detected. Using port 3000..."; \
	else \
		echo "\nℹ️  Linux/Unix detected. Using port 3000..."; \
	fi

install-deps:
	@echo "\n📦 Installing dependencies..."
	@npm install
	@echo "\n✅ Dependencies installed successfully!"

run-local: check-node check-port install-deps
	@echo "\n🚀 Starting Vite development server..."
	@echo "\n📝 Important Information:"
	@echo "   • The application will run on http://localhost:3000"
	@echo "   • If you need to use port 80, you can set up port forwarding:"
	@echo "     - Windows: Use netsh interface portproxy"
	@echo "     - Linux/macOS: Use sudo iptables or port forwarding in your router"
	@echo "\n🌐 Opening browser..."
	@npm run dev

deploy: check-node install-deps
	@echo "\n🚀 Starting deployment process..."
	@echo "\n📦 Building the project..."
	@npm run build
	@echo "\n✅ Build completed!"
	@echo "\n📝 Would you like to:"
	@echo "1) Create a new Netlify site"
	@echo "2) Deploy to an existing site"
	@read -p "Enter your choice (1 or 2): " choice; \
	if [ "$$choice" = "1" ]; then \
		echo "\n📝 Creating new site..."; \
		npx netlify deploy --prod --dir=dist; \
	else \
		echo "\n📝 Available Netlify sites:"; \
		npx netlify sites:list; \
		read -p "Enter the site ID to deploy to: " SITE_ID; \
		echo "\n📝 Deploying to site $$SITE_ID..."; \
		npx netlify deploy --prod --dir=dist --site=$$SITE_ID; \
	fi 
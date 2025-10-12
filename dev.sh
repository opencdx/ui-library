#!/bin/bash

# UI Library Development Menu
# Interactive script to run common development tasks
#
# Usage: ./dev.sh
#
# Features:
#   - 24+ commands organized into 7 categories
#   - Color-coded output for better UX
#   - Pre-release checklist automation
#   - CI workflow simulator
#   - Project status dashboard
#
# Documentation:
#   - See README.md section "Developer Menu"
#   - See TESTING.md for testing-specific workflows

set -e

# Colors for better UX
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Clear screen and show header
clear
echo -e "${CYAN}${BOLD}"
echo "╔════════════════════════════════════════════════════════╗"
echo "║         UI Library Development Menu v1.0.0             ║"
echo "╚════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Main menu function
show_menu() {
    echo ""
    echo -e "${BOLD}📦 BUILD & DEVELOPMENT${NC}"
    echo "  1) Build library (ESM + CJS)"
    echo "  2) Build TypeScript types"
    echo "  3) Clean build (remove dist/)"
    echo ""
    echo -e "${BOLD}🧪 TESTING (Playwright)${NC}"
    echo "  4) Run tests (component + E2E if present)"
    echo "  5) Run component tests only (70 tests)"
    echo "  6) Run tests in UI mode (interactive)"
    echo "  7) Run tests in headed mode (visible browser)"
    echo "  8) Debug tests (Playwright Inspector)"
    echo "  9) Generate coverage report"
    echo ""
    echo -e "${BOLD}🎨 STORYBOOK${NC}"
    echo " 10) Start Storybook dev server"
    echo " 11) Build Storybook (static)"
    echo ""
    echo -e "${BOLD}🔍 CODE QUALITY${NC}"
    echo " 12) Lint code (ESLint)"
    echo " 13) Lint and auto-fix"
    echo ""
    echo -e "${BOLD}🔒 SECURITY & MAINTENANCE${NC}"
    echo " 14) Check production dependencies (npm audit)"
    echo " 15) Check all dependencies (dev + prod)"
    echo " 16) Fix vulnerabilities (safe)"
    echo " 17) Check outdated packages"
    echo ""
    echo -e "${BOLD}📦 PACKAGE MANAGEMENT${NC}"
    echo " 18) Install dependencies (npm install)"
    echo " 19) Clean install (remove node_modules + reinstall)"
    echo " 20) Create tarball for local testing"
    echo ""
    echo -e "${BOLD}📊 PROJECT INFO${NC}"
    echo " 21) Show project status"
    echo " 22) View test report (last run)"
    echo ""
    echo -e "${BOLD}🚀 QUICK ACTIONS${NC}"
    echo " 23) Full CI workflow (lint + test + build)"
    echo " 24) Pre-release checklist"
    echo ""
    echo -e "${RED} 0) Exit${NC}"
    echo ""
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

# Function to run command with nice output
run_command() {
    local cmd=$1
    local desc=$2
    
    echo ""
    echo -e "${CYAN}▶ Running: ${BOLD}$desc${NC}"
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    
    if eval "$cmd"; then
        echo ""
        echo -e "${GREEN}✅ Success: $desc${NC}"
    else
        echo ""
        echo -e "${RED}❌ Failed: $desc${NC}"
        return 1
    fi
}

# Function to show project status
show_status() {
    echo ""
    echo -e "${CYAN}${BOLD}📊 Project Status${NC}"
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    
    # Check if node_modules exists
    if [ -d "node_modules" ]; then
        echo -e "${GREEN}✓${NC} Dependencies installed"
    else
        echo -e "${RED}✗${NC} Dependencies not installed (run npm install)"
    fi
    
    # Check if dist exists
    if [ -d "dist" ]; then
        echo -e "${GREEN}✓${NC} Library built (dist/ exists)"
    else
        echo -e "${YELLOW}⚠${NC} Library not built (run npm run build)"
    fi
    
    # Check Node version
    echo -e "${BLUE}ℹ${NC} Node version: $(node --version)"
    echo -e "${BLUE}ℹ${NC} npm version: $(npm --version)"
    
    # Show package info
    echo -e "${BLUE}ℹ${NC} Package: $(node -p "require('./package.json').name") v$(node -p "require('./package.json').version")"
    
    # Count test files
    local test_count=$(find tests/component -name "*.spec.tsx" 2>/dev/null | wc -l | tr -d ' ')
    echo -e "${BLUE}ℹ${NC} Component tests: $test_count files"
    
    # Show last test results if available
    if [ -d "test-results" ]; then
        echo -e "${GREEN}✓${NC} Test results available (run option 22 to view)"
    fi
    
    echo ""
}

# Function for pre-release checklist
pre_release_checklist() {
    echo ""
    echo -e "${MAGENTA}${BOLD}🚀 Pre-Release Checklist${NC}"
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    
    echo -e "${CYAN}Running pre-release checks...${NC}"
    echo ""
    
    local all_passed=true
    
    # 1. Lint
    echo -e "${BLUE}[1/5]${NC} Linting code..."
    if npm run lint > /dev/null 2>&1; then
        echo -e "${GREEN}  ✓ Lint passed${NC}"
    else
        echo -e "${RED}  ✗ Lint failed${NC}"
        all_passed=false
    fi
    
    # 2. Tests
    echo -e "${BLUE}[2/5]${NC} Running tests..."
    if npm run test:component > /dev/null 2>&1; then
        echo -e "${GREEN}  ✓ All tests passed${NC}"
    else
        echo -e "${RED}  ✗ Tests failed${NC}"
        all_passed=false
    fi
    
    # 3. Build
    echo -e "${BLUE}[3/5]${NC} Building library..."
    if npm run build > /dev/null 2>&1; then
        echo -e "${GREEN}  ✓ Build successful${NC}"
    else
        echo -e "${RED}  ✗ Build failed${NC}"
        all_passed=false
    fi
    
    # 4. Security audit
    echo -e "${BLUE}[4/5]${NC} Checking production dependencies..."
    if npm audit --production > /dev/null 2>&1; then
        echo -e "${GREEN}  ✓ No vulnerabilities found${NC}"
    else
        echo -e "${YELLOW}  ⚠ Vulnerabilities detected (review with npm audit)${NC}"
    fi
    
    # 5. Check for uncommitted changes
    echo -e "${BLUE}[5/5]${NC} Checking git status..."
    if [ -z "$(git status --porcelain 2>/dev/null)" ]; then
        echo -e "${GREEN}  ✓ No uncommitted changes${NC}"
    else
        echo -e "${YELLOW}  ⚠ You have uncommitted changes${NC}"
    fi
    
    echo ""
    if [ "$all_passed" = true ]; then
        echo -e "${GREEN}${BOLD}✅ All checks passed! Ready to release.${NC}"
    else
        echo -e "${RED}${BOLD}❌ Some checks failed. Please fix issues before release.${NC}"
    fi
    echo ""
}

# Main loop
while true; do
    show_menu
    read -p "$(echo -e ${CYAN}Enter your choice [0-24]:${NC} )" choice
    
    case $choice in
        1)
            run_command "npm run build" "Build library"
            ;;
        2)
            run_command "npm run build:types" "Build TypeScript types"
            ;;
        3)
            run_command "rm -rf dist && echo 'Cleaned dist/' && npm run build" "Clean and rebuild"
            ;;
        4)
            run_command "npm run test:component && if [ -d 'tests/e2e' ] && find tests/e2e -type f \( -name '*.spec.ts' -o -name '*.spec.tsx' -o -name '*.test.ts' -o -name '*.test.tsx' \) | grep -q .; then npm test; else echo 'No E2E tests found, skipping.'; fi" "Run tests (component + E2E if present)"
            ;;
        5)
            run_command "npm run test:component" "Run component tests (70 tests)"
            ;;
        6)
            echo -e "${CYAN}Starting Playwright UI mode...${NC}"
            npm run test:ui
            ;;
        7)
            # Prefer component tests in headed mode; fallback to E2E if present
            if find tests/component -name "*.spec.tsx" 2>/dev/null | grep -q .; then
                run_command "npx playwright test --config=playwright-ct.config.ts --headed" "Run component tests in headed mode"
            elif [ -d "tests/e2e" ] && find tests/e2e -type f \( -name "*.spec.ts" -o -name "*.spec.tsx" -o -name "*.test.ts" -o -name "*.test.tsx" \) 2>/dev/null | grep -q .; then
                run_command "npx playwright test --headed" "Run E2E tests in headed mode"
            else
                echo -e "${YELLOW}No tests found (component or E2E).${NC}"
            fi
            ;;
        8)
            # Prefer component tests in debug (Inspector) mode; fallback to E2E if present
            if find tests/component -name "*.spec.tsx" 2>/dev/null | grep -q .; then
                run_command "npx playwright test --config=playwright-ct.config.ts --debug" "Debug component tests (Playwright Inspector)"
            elif [ -d "tests/e2e" ] && find tests/e2e -type f \( -name "*.spec.ts" -o -name "*.spec.tsx" -o -name "*.test.ts" -o -name "*.test.tsx" \) 2>/dev/null | grep -q .; then
                run_command "npx playwright test --debug" "Debug E2E tests (Playwright Inspector)"
            else
                echo -e "${YELLOW}No tests found (component or E2E).${NC}"
            fi
            ;;
        9)
            run_command "npm run coverage" "Generate coverage report"
            ;;
        10)
            echo -e "${CYAN}Starting Storybook dev server on http://localhost:6006${NC}"
            npm run storybook
            ;;
        11)
            run_command "npm run build-storybook" "Build Storybook"
            ;;
        12)
            run_command "npm run lint" "Lint code"
            ;;
        13)
            run_command "npm run lint:fix" "Lint and auto-fix"
            ;;
        14)
            run_command "npm run audit" "Check production dependencies"
            ;;
        15)
            echo -e "${CYAN}Checking all dependencies (including dev)...${NC}"
            if npm run audit:dev; then
                echo -e "${GREEN}✅ No blocking vulnerabilities in dev or prod dependencies${NC}"
            else
                echo -e "${YELLOW}⚠ Audit reported vulnerabilities (dev and/or prod). Review details above.${NC}"
                # Do not fail the menu on non-zero exit from audit
            fi
            ;;
        16)
            run_command "npm run audit:fix" "Fix vulnerabilities (safe)"
            ;;
        17)
            echo -e "${CYAN}Checking for outdated packages...${NC}"
            if npm run outdated; then
                echo -e "${GREEN}✅ All dependencies up to date${NC}"
            else
                echo -e "${YELLOW}⚠ Outdated packages are listed above. This is informational, not an error.${NC}"
            fi
            ;;
        18)
            run_command "npm install" "Install dependencies"
            ;;
        19)
            run_command "rm -rf node_modules package-lock.json && npm install" "Clean install"
            ;;
        20)
            run_command "npm pack" "Create tarball"
            echo -e "${GREEN}Tarball created! Install in another project with:${NC}"
            echo -e "${CYAN}  npm install ../ui-library/ui-library-*.tgz${NC}"
            ;;
        21)
            show_status
            ;;
        22)
            if [ -d "playwright-report" ]; then
                echo -e "${CYAN}Opening test report...${NC}"
                npx playwright show-report
            else
                echo -e "${RED}No test report found. Run tests first (option 5).${NC}"
            fi
            ;;
        23)
            echo -e "${MAGENTA}${BOLD}Running full CI workflow...${NC}"
            run_command "npm run lint && npm run test:component && npm run build" "CI workflow"
            ;;
        24)
            pre_release_checklist
            ;;
        0)
            echo ""
            echo -e "${GREEN}Thanks for using UI Library Dev Menu! 👋${NC}"
            echo ""
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid option. Please try again.${NC}"
            sleep 1
            clear
            ;;
    esac
    
    # Wait for user to continue
    if [ "$choice" != "0" ] && [ "$choice" != "6" ] && [ "$choice" != "8" ] && [ "$choice" != "10" ] && [ "$choice" != "22" ]; then
        echo ""
        read -p "$(echo -e ${YELLOW}Press Enter to continue...${NC})"
        clear
    fi
done


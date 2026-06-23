# Playwright E-Commerce Test Automation Framework

Comprehensive end-to-end test automation suite for an e-commerce platform built with **Playwright** and **JavaScript**. This project demonstrates modern test automation practices including Page Object Model (POM), BDD-style test organization, cross-browser testing, and detailed reporting.

## Project Overview

**Application Under Test:** https://www.automationexercise.com

**Test Coverage:** 45+ automated test cases across multiple workflows

**Browsers Tested:** Chromium, Firefox, WebKit (Safari), Mobile Chrome, Mobile Safari

**Framework:** Playwright with Node.js

---

## Key Features

- **Page Object Model (POM)** - Clean, maintainable test code with 6+ page objects
- **Cross-Browser Testing** - Tests run on Chromium, Firefox, WebKit, and mobile browsers
- **Multiple Test Types** - Smoke tests, regression tests, sanity tests, E2E flows
- **Advanced Reporting** - HTML reports with screenshots and videos on failures
- **Test Data Management** - Centralized test data with helper utilities
- **Parallel Execution** - Tests run in parallel for faster feedback
- **GitHub Actions Ready** - CI/CD pipeline included

---

## Project Structure

```
playwright-ecommerce-tests/
├── pages/                          # Page Object Models
│   ├── HomePage.js                
│   ├── LoginPage.js               
│   ├── ProductsPage.js            
│   ├── CartPage.js                
│   ├── CheckoutPage.js           
│   └── AccountPage.js            
├── tests/                         # Test specifications
│   ├── 01-login.spec.js          
│   ├── 02-products.spec.js       
│   ├── 03-cart.spec.js           
│   ├── 04-checkout.spec.js       
│   ├── 05-account.spec.js        
│   ├── 06-e2e-complete-flow.spec.js  
│   └── 07-cross-browser.spec.js  
├── utils/
│   ├── testData.js               
│   └── helpers.js
|   └── testUtils.js                 
├── playwright.config.js          
├── package.json                  
├── .gitignore                    
└── README.md                    
```

---

## Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/nazim2125/playwright-ecommerce-tests.git
cd playwright-ecommerce-tests
```

2. **Install dependencies**
```bash
npm install
```

3. **Install Playwright browsers**
```bash
npx playwright install
```

---

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Headed Mode
```bash
npm run test:headed
```

### Run Tests in UI Mode 
```bash
npm run test:ui
```

### Run Tests in Debug Mode
```bash
npm run test:debug
```

### Run Tests on Specific Browser
```bash
# Chromium only
npm run test:chromium

# Firefox only
npm run test:firefox

# WebKit (Safari) only
npm run test:webkit


### Run Tests by Tag
```bash
# Only smoke tests
npm run test:smoke

# Only regression tests
npm run test:regression

# Only sanity tests
npm run test:sanity
```

### Run Specific Test File
```bash
npx playwright test tests/01-login.spec.js
```

### Run Specific Test Case
```bash
npx playwright test -g "TC001"
```

---

## Test Reports

### View HTML Report
```bash
npm run report
```

### Test Results Files
- **HTML Report:** `playwright-report/index.html`
- **JSON Results:** `test-results/results.json`
- **JUnit XML:** `test-results/results.xml`

---

## Key Metrics

| Metric | Value |
|--------|-------|
| Test Cases | 45+ |
| Code Coverage | Multiple workflows |
| Browser Support | 5 browsers |
| Execution Time | ~2-3 minutes (parallel) |
| Pass Rate Target | 95%+ |
| Flaky Test Prevention | Robust wait strategies |

---

## CI/CD Integration

### GitHub Actions Setup
The project includes a `.github/workflows/` directory with:
- Automated test execution on push
- Cross-browser testing pipeline
- HTML report generation
- Test result artifacts


### Tests Failing?
1. Ensure the application is accessible at `https://www.automationexercise.com`
2. Check internet connectivity
3. Verify test data is correct in `utils/testData.js`
4. Check browser compatibility

```

---

## 📞 Contact & Support

**Author:** Mohd Nazim Rasalat  
**Email:** nazim57262@gmail.com  
**LinkedIn:** linkedin.com/in/nazim21/  

---

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.

---

**Last Updated:** June 2026  
**Playwright Version:** 1.40.0+  
**Node.js Version:** 14.0.0+

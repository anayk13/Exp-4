# Quick Start Guide 🚀

Get up and running with the React Selenium Testing project in minutes!

## 📦 Installation

```bash
# Install dependencies
npm install
```

## 🏃 Run Application Locally

```bash
# Start the development server
npm start
```

Visit: http://localhost:3000

## 🧪 Run Tests Locally

### Option 1: Manual Testing

1. **Start the app** (in one terminal):
   ```bash
   npm start
   ```

2. **Run Selenium tests** (in another terminal):
   ```bash
   npm run test:selenium
   ```

### Option 2: Automated Script

You can create a simple script to automate both:

**test-local.sh** (Linux/Mac):
```bash
#!/bin/bash
echo "Starting React app..."
npm start &
APP_PID=$!

echo "Waiting for app to start..."
sleep 10

echo "Running Selenium tests..."
npm run test:selenium

echo "Stopping React app..."
kill $APP_PID
```

Make it executable and run:
```bash
chmod +x test-local.sh
./test-local.sh
```

## 🎯 What to Expect

### Application Features to Test

1. **Counter Section**:
   - Click "Increment" → Counter increases
   - Click "Decrement" → Counter decreases
   - Click "Reset" → Counter returns to 0

2. **Form Section**:
   - Enter a name in the input field
   - Click "Submit"
   - See greeting message: "Hello, [Your Name]!"

### Test Results

When tests run successfully, you'll see:

```
  React App Selenium Tests
    Page Load Tests
      ✓ should load the application successfully (1234ms)
      ✓ should display the main title (567ms)

    Counter Functionality Tests
      ✓ should display initial counter value as 0 (789ms)
      ✓ should increment counter when increment button is clicked (890ms)
      ✓ should decrement counter when decrement button is clicked (891ms)
      ✓ should reset counter to 0 when reset button is clicked (1200ms)
      ✓ should handle multiple increment operations correctly (1456ms)

    Form Functionality Tests
      ✓ should display name input field (567ms)
      ✓ should accept text input in the name field (678ms)
      ✓ should display greeting message after form submission (890ms)
      ✓ should update greeting message with different names (1234ms)

    UI Element Verification Tests
      ✓ should have all required buttons visible (789ms)
      ✓ should have correct button text (567ms)
      ✓ should have proper input placeholder text (456ms)

  15 passing (12s)
```

## 🛠️ Development Tips

### Modify Tests

Tests are located in: `test/selenium/app.test.js`

Example of adding a new test:
```javascript
it('should do something awesome', async function() {
    await driver.get(APP_URL);
    const element = await driver.findElement(By.id('my-element'));
    const text = await element.getText();
    expect(text).to.equal('Expected Text');
});
```

### Modify App

Main app code: `src/App.js`

Add a new feature:
```javascript
const [message, setMessage] = useState('');

// In your JSX
<div id="my-new-feature">
  <button onClick={() => setMessage('Hello!')}>
    Click Me
  </button>
  {message && <p id="message">{message}</p>}
</div>
```

Then test it:
```javascript
it('should display message when button clicked', async function() {
    const button = await driver.findElement(By.css('#my-new-feature button'));
    await button.click();
    const message = await driver.findElement(By.id('message'));
    expect(await message.getText()).to.equal('Hello!');
});
```

## 🐛 Troubleshooting

### "Port 3000 is already in use"

```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9
```

### "ChromeDriver not found"

```bash
# Reinstall chromedriver
npm install chromedriver
```

### "Tests are failing"

1. Make sure app is running on http://localhost:3000
2. Open browser and manually test the feature
3. Check if element IDs match in both App.js and tests
4. Increase timeouts if needed (in test file)

### "Browser not opening"

Tests run in headless mode by default. To see the browser:

In `test/selenium/app.test.js`, comment out headless options:
```javascript
const options = new chrome.Options();
// options.addArguments('--headless');  // Comment this out
options.addArguments('--no-sandbox');
```

## 📊 Build for Production

```bash
# Create production build
npm run build

# The build folder will contain optimized files
# Deploy the 'build' folder to your web server
```

## 🎨 Customize Styling

Edit `src/App.css` to change:
- Colors
- Fonts
- Layout
- Animations

Example:
```css
#main-title {
  color: #your-color;
  font-size: 3rem;
}
```

## 📚 Learn More

- [React Documentation](https://react.dev/)
- [Selenium WebDriver](https://www.selenium.dev/documentation/webdriver/)
- [Mocha Test Framework](https://mochajs.org/)
- [Chai Assertions](https://www.chaijs.com/)

## ✨ Next Steps

1. ✅ Run the app locally
2. ✅ Play with the features
3. ✅ Run the tests
4. ✅ Add your own features
5. ✅ Write new tests
6. ✅ Set up Jenkins pipeline (see SETUP_GUIDE.md)

---

**Happy Coding! 💻**


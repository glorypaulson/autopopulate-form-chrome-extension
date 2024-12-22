// content-script.js

function autoPopulateForm() {
  const inputs = document.querySelectorAll('input[type="text"],textarea,input[type="email"]');
  const selects = document.querySelectorAll('select')
  const inputCheckbox = document.querySelectorAll('input[type="checkbox"]')
  const radioButton = document.querySelectorAll('input[type="radio"]')
  const inputNumber = document.querySelectorAll('input[type="number"]')
  const passwordField = document.querySelectorAll('input[type="password"]')
  const inputTypeTel = document.querySelectorAll('input[type="tel"]')
  const matSelects = document.querySelectorAll('mat-select')
  const matOption = document.querySelectorAll('mat-option')
  const matFormFields = document.querySelectorAll('mat-form-field')
  const matCheckbox = document.querySelectorAll('mat-checkbox')

  // inputs.forEach(input => {
  //   // Fill each input with dummy data
  //   if (input.type === 'text') {
  //     input.value = 'John Doe'; // Example dummy name
  //   } 
  //   else if (input.type === 'email') {
  //     input.value = 'john.doe@example.com'; // Example dummy email
  //   } else if (input.tagName.toLowerCase() === 'textarea') {
  //     input.value = 'This is a sample text for the textarea.';
  //   } else if(input.tagName.toLowerCase() === 'mat-checkbox'){
  //     input.checked = true; // Example for checking a checkbox
  //   } else if(input.type === 'tel'){
  //     input.value = '1234567890'; // Example for a phone number input
  //   }
  // });

  inputs.forEach((input, index) => {

    // Get the 'id' and 'name' of each input element
    const inputId = input.id ? input.id : null;
    const inputName = input.name ? input.name : null;

    // Log the id and name attributes to the console
    console.log(`Input Field -> Type: ${input.type}, ID: ${inputId}, Name: ${inputName}`);
    const nameField = inputId ? document.querySelector(`input[id=${inputId}]`) : document.querySelector(`input[name=${inputName}]`);
    console.log(nameField);
    const pattern_email = /^.*email.*$|^email.*|.*email$/i;  // 'i' flag makes it case-insensitive
    const pattern_date = /^.*date.*$|^date.*|.*date$|^.*dob.*$|^dob.*|.*dob$/i;   // for both date and dob (date of birth)
    const pattern_number = /^.*phone.*$|^phone.*|.*phone$|^.*mobile.*$|^mobile.*|.*mobile$|^.*contact.*$|^contact.*|.*contact$/i;   //for both phone and mobile matching input id and name

    // For input type = textarea which is not part of input[type]
    if (input.tagName.toLowerCase() === 'textarea') {
      input.value = 'This is a sample text for Textarea field'
    }

    // For input types = text and different cases of it 
    if (nameField) {
      if (pattern_email.test(inputId) || pattern_email.test(inputName) || nameField.type === 'email') {
        nameField.value = getRandomEmail();
      }
      else if (pattern_date.test(inputId) || pattern_date.test(inputName)) {
        nameField.value = getRandomDate();
      }
      else if (pattern_number.test(inputId) || pattern_number.test(inputName)) {
        nameField.value = getRandomPhoneNumber();
      }
      else {
        nameField.value = getRandomName();
        // nameField.value = `Jane Doetest`;
      }
    }
  });
  /////////////////////////////////////////////////
  matFormFields.forEach((matField) => {
    const input = matField.querySelector('input, textarea');

    if (input) {
      const inputId = input.id || null;
      const inputName = input.name || null;

      if (/email/i.test(inputId) || /email/i.test(inputName)) {
        input.value = 'john.doe@example.com';
      } else if (/date|dob/i.test(inputId) || /date|dob/i.test(inputName)) {
        input.value = '1/1/2015';
      } else if (/phone|mobile/i.test(inputId) || /phone|mobile/i.test(inputName)) {
        input.value = '9123456780';
      }
      else if (input.tagName.toLowerCase() === 'textarea') {
        input.value = 'This is a sample text for Textarea field for mat form field'
      }
      else {
        input.value = 'Jane Doe';
      }
    }
    ///////////////////////////////////Using Form ControlName for matformfields in Angular/////////////////////////
    const formControlNameValues = {
      email: getRandomEmail(),
      phone: getRandomPhoneNumber(),
      dob: getRandomDate(),
      textarea: 'This is a sample text for Textarea field for mat form field',
      price: '20',
      discount: '10',
      discount_price: '10',
    }
    const formControls = document.querySelectorAll('[formControlName]');
    formControls.forEach((input) => {
      try {
        const controlName = input.getAttribute('formControlName');
        console.log(`Form Control Name: ${controlName}`);
        input.value = formControlNameValues[controlName] || 'Sample text'
      } catch (error) {
        console.error('Error occurred while setting value for input:', error);
      }
    });
  })
  ///////////////////////////////////////////////////
  matCheckbox.forEach((checkbox) => {
    const checkboxInput = checkbox.querySelector('input[type="checkbox"]');
    if (checkboxInput) {
      checkboxInput.checked = true; // Set the checkbox to checked
    }
  })
  ///////////////////////////////////////////////////
  // matSelects.forEach((selects)=>{
  //   console.log(selects);
  //   selects.click()
  //   const firstOption = selects.querySelectorAll('mat-option')
  //   console.log(firstOption);
    
  // })
  ///////////////////////////////////////////////////
  selects.forEach((select) => {
    try {
      console.log(select);
      const firstOption = select.querySelectorAll('option');
      if (firstOption) {
        console.log(firstOption.value);
        select.value = firstOption[1].value;
      }
    } catch (error) {
      console.log(' Error occured in options');

    }
  });
  // Function to open mat-select, select the second option, and set its value
  matSelects.forEach((select) => {
    try {
      console.log(select);
  
      // Programmatically open the mat-select
      select.click();
  
      // Use a timeout to wait for options to render
      setTimeout(() => {
        const panel = document.querySelector('.mat-select-panel'); // Ensure options are inside the mat-select-panel
        const options = panel ? panel.querySelectorAll('mat-option') : [];
  
        if (options.length > 1) {
          const secondOption = options[1];
          console.log('Second option found:', secondOption);
  
          secondOption.click(); // Select the second option
  
          const value = secondOption.getAttribute('ng-reflect-value');
          const formControlName = select.getAttribute('formControlName');
  
          if (formControlName) {
            const form = this.form; // Ensure 'this.form' refers to your Angular form group
            if (form && form.get(formControlName)) {
              form.get(formControlName).setValue(value); // Update form control value
            } else {
              console.error(`Form control ${formControlName} not found.`);
            }
          } else {
            console.error('formControlName attribute not found.');
          }
        } else {
          console.log("Second mat-option not found, skipping this select.");
        }
      }, 200); // Adjust timeout as needed
    } catch (error) {
      console.error('Error occurred:', error);
    }
  });
  
  /////////////////////////////////////////////////
  passwordField.forEach((password) => {
    console.log(password);

    password.value = getRandomPassword();
    console.log(password.value);

  })
  ///////////////////////////////////////////////////
  inputTypeTel.forEach((input) => {
    console.log(input);
    input.value = getRandomPhoneNumber();
  })
  /////////////////////////////////////////////////
  inputCheckbox.forEach((input) => {
    console.log(input);
    input.checked = getRandomBoolean();
  })
  //////////////////////////////////////////////////
  radioButton.forEach((radio) => {
    console.log(radio);
    radio.checked = getRandomBoolean();
  })
  //////////////////////////////////////////////////
  inputNumber.forEach((input) => {
    console.log(input);
    input.value = getRandomNumber(input.min , input.max)
    console.log(input.value);
  })
}

// Example for populating specific fields by their names/ids





// Listen for messages from the popup (i.e., when the "AutoPopulate" button is clicked)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'autopopulate') {
    autoPopulateForm();
    sendResponse({ status: 'Form populated!' });
  }
});




// Helper function to generate a random data...
function getRandomEmail() {
  const names = ["john", "jane", "alex", "chris", "morgan"];
  const domains = ["example.com", "testmail.com", "demo.org"];
  const name = names[Math.floor(Math.random() * names.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${name}.${Math.floor(Math.random() * 100)}@${domain}`;
}

function getRandomPhoneNumber() {
  return `9${Math.floor(100000000 + Math.random() * 900000000)}`; // 10-digit number starting with 9
}

function getRandomDate() {
  const start = new Date(1980, 0, 1);
  const end = new Date(2015, 11, 31);
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return `${randomDate.getMonth() + 1}/${randomDate.getDate()}/${randomDate.getFullYear()}`;
}

function getRandomName() {
  const firstNames = ["John", "Jane", "Alex", "Chris", "Bob"];
  const lastNames = ["Titus", "Joseph", "Dsouza", "Robin"];
  const randomFname = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLname = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${randomFname} ${randomLname}+${Math.floor(Math.random() * 10)}`;
}

function getRandomPassword() {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.[!@#$%^&*?_~-,()]+/)!';
  var password = '';
  for (var i = 0; i < 10; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
}

function getRandomBoolean() {
  return Math.random() < 0.6;
}
function getRandomNumber(min , max){
  const result = Math.floor(Math.random() * (max - min + 1));
  if (result > min && result < max) return result;
  if (result === 0) return result + min;
}


//Collecting data
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'collectData') {
    collectData();
    sendResponse({ status: 'Collected Data!' });
  }
});

function collectData(){
  console.log('hiii');
  
  const paragraphs = document.querySelectorAll('p');
  paragraphs.forEach((p, index) => {
    console.log(`Paragraph ${index + 1}:`, p.textContent);
  });
  
}
document.addEventListener('DOMContentLoaded', function () {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    var form = document.getElementById('form');
    var result = document.querySelector('.form__success');

    var errorEmail = document.getElementById('email-error');
    var errorPhone = document.getElementById('phone-error');
    var phoneParent = document.querySelector('.phone-parent');

    var emailInput = document.getElementById('email')
    var nameInput = document.getElementById('name')
    var phoneInput = document.getElementById('phone')

    var errorEmailMessage = '';
    var errorPhoneMessage = '';

    const TOKEN = "7376749387:AAGzuishgiukH8SVULThKCrAfEeMUOOM0_Q";
    const CHAT_ID = "-1002198764081";
    const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    form.addEventListener('submit', formSend);

    // iti 
    const input = document.querySelector("#phone");
    var iti = window.intlTelInput(input, {
        defaultCountry: 'ua',
        preferredCountries: ['ua'],
        nationalMode: true,
        separateDialCode: true,
        utilsScript: '/utils.js'
    })
    input.oninput = function () {
        if (this.value.match(/[^0-9,+]/g)) {
            this.value = this.value.replace(/[^0-9,+]/g, "");
        };
    }

    async function formSend(e) {
        e.preventDefault()

        let error = formValidate(form)
        if (error === 0) {
            form.classList.add('locked')
            let message = `<b>Александр Ксёнз - ТЗ</b>\n`;
            message += `<b>Имя и фамилия:</b> ${nameInput.value}\n`;
            message += `<b>Номер телефона:</b> ${iti.getNumber()}\n`;
            message += `<b>Email:</b> ${emailInput.value}`;

            axios.post(URI_API, {
                chat_id: CHAT_ID,
                parse_mode: 'html',
                text: message
            })
                .then((res) => {
                    result.classList.add('active');
                })
                .finally(() => {
                    form.reset();
                    setTimeout(() => {
                        result.classList.remove('active');
                    }, 3000);
                    form.classList.remove('locked')
                })
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('.require');

        for (let i = 0; i < formReq.length; i++) {
            let input = formReq[i];
            formRemoveError(input);

            if (input.id === 'email') {
                if (input.value.length < 1) {
                    formAddError(input)
                    errorEmailMessage = 'Пустое поле'
                    error++;
                } else if (!regex.test(input.value) && input.value.length > 1) {
                    formAddError(input)
                    errorEmailMessage = 'Неправильный email'
                    error++;
                }
                errorEmail.textContent = errorEmailMessage;
            }

            if (input.id === 'name') {
                if (input.value.length < 1) {
                    formAddError(input);
                    error++;
                }
            }

            if (input.id === 'phone') {
                if (input.value.length < 1) {
                    input.classList.add('error')
                    phoneParent.classList.add('error')
                    errorPhoneMessage = 'Пустое поле';
                    error++;
                } else if (!iti.isValidNumber()) {
                    input.classList.add('error')
                    phoneParent.classList.add('error')
                    errorPhoneMessage = 'Неправильный номер телефона';
                    error++;
                } else {
                    phoneParent.classList.remove('error')
                }
                errorPhone.textContent = errorPhoneMessage;
            }
        }
        return error
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('error')
        input.classList.remove('error')
    }
    function formAddError(input) {
        input.parentElement.classList.add('error')
        input.classList.add('error')
    }

    emailInput.addEventListener('blur', function () {
        if (this.value.length < 1) {
            formAddError(this)
            errorEmailMessage = 'Пустое поле'
        } else if (!regex.test(this.value) && this.value.length > 1) {
            formAddError(this)
            errorEmailMessage = 'Неправильный email'
        } else {
            formRemoveError(this)
        }
        errorEmail.textContent = errorEmailMessage;
    })
    nameInput.addEventListener('blur', function () {
        if (this.value.length < 1) {
            formAddError(this);
        } else {
            formRemoveError(this)
        }
    })
    phoneInput.addEventListener('blur', function () {
        if (this.value.length < 1) {
            this.classList.add('error')
            phoneParent.classList.add('error')
            errorPhoneMessage = 'Пустое поле';
        } else if (!iti.isValidNumber()) {
            this.classList.add('error')
            phoneParent.classList.add('error')
            errorPhoneMessage = 'Неправильный номер телефона';
        } else {
            formRemoveError(this)
            phoneParent.classList.remove('error')
        }
        errorPhone.textContent = errorPhoneMessage;
    })
})
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('form');
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var errorEmail = document.getElementById('email-error');
    var errorPhone = document.getElementById('phone-error');
    var phoneParent = document.querySelector('.phone-parent');
    var errorEmailMessage = '';
    var errorPhoneMessage = '';


    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault()

        let error = formValidate(form)
        let formData = new FormData(form);

        if (error === 0) {
            console.log(formData)
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            })
            if (response.ok) {
                let.result = await response.json();
                form.reset();
            }
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

            if(input.id === 'phone') {
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

    // iti 
    const input = document.querySelector("#phone");
    var iti = window.intlTelInput(input, {
        defaultCountry: 'ua',
        preferredCountries: ['ua'],
        nationalMode: true,
        separateDialCode: true,
        utilsScript: '/utils.js'
    })
})
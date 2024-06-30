var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
var errorEmail = '';
$('#email').blur(function () {
    $(this).parent().addClass('error');
    if (($(this).val().length < 1)) {
        errorEmail = 'Пустое поле'
    } else if (!regex.test($(this).val()) && ($(this).val().length > 1)) {
        errorEmail = 'Неправильный email'
    } else {
        $(this).parent().removeClass('error');
    }
    $('#email-error').text(errorEmail);
})

$('#name, #phone').blur(function () {
    if (($(this).val().length < 1)) {
        $(this).parent().addClass('error');
    } else {
        $(this).parent().removeClass('error');
    }
})
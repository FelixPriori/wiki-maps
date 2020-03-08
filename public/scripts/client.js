//Basic form 

const createForm = function(){
    let form = `<div id="userRegister" ><form action="POST" method="/login">
                <label for="fname">First name:</label>
                <input type="text" id="fname" name="fname"><br><br>
                <label for="lname">Last name:</label>
                <input type="text" id="lname" name="lname"><br><br>
                <input type="submit" value="Submit"></form><div>`;

    return form;
}

$('#register').click(function () {
    $form = createForm();
    $('.aside-content').append($form);
});

$()
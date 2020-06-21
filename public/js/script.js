function create(e) {
    e.preventDefault();
    let body = $("#create-task-form").serialize();
    console.log(body);
    $.ajax(
        {
            url: "/task/",
            dataType: "json",
            method: "POST",
            data: body,
            succes (res) {
                $("#create-task-form input").val('');
            }
        }
    )
}



$(document).ready(() => {
    $('#myTab a').on('click', function (e) {
        e.preventDefault();
        $(this).tab('show')
    });
    $("#create-task-form").on('submit', (e)=>{ create(e)})
})
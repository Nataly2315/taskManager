function create(e) {
    e.preventDefault();
    let body = $("#create-task-form").serialize();
    $.ajax(
        {
            url: "/task/",
            dataType: "json",
            method: "POST",
            data: body,
            complete(res) {
                window.location = '/#createTask'
                window.location.reload();
            }
        }
    )
}


function doneTask(tskId) {
    const comment = $(`#task${tskId}-comment`).val().trim();
    const status = "Done";
    updateTask(tskId, { comment, status });
    window.location = '/#toDo'
    window.location.reload();
}

function rejectTask(tskId) {
    const comment = $(`#task${tskId}-comment`).val().trim();
    const status = "Rejected";
    updateTask(tskId, { comment, status });
    window.location = '/#toDo'
    window.location.reload();
}

function confirmTask(tskId) {
    const status = "Confirmed";
    updateTask(tskId, { status });
    window.location = '/#task-list'
    window.location.reload();
}

function returnTask(tskId) {
    const status = "Returned";
    updateTask(tskId, { status });
    window.location = '/#task-list'
    window.location.reload();
}


function updateTask(tskId, body) {
    $.ajax(
        {
            url: "/task/" + tskId,
            dataType: "json",
            method: "PUT",
            data: body,
            complete(res) {
               return true
            }
        }
    )
}



$(document).ready(() => {
    $('#myTab a').on('click', function (e) {
        e.preventDefault();
        $(this).tab('show')
    });
    $("#create-task-form").on('submit', (e) => { create(e) })

})
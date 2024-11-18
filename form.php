
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
</head>
<body>
    <div>
        <div class="d-flex">
        <button type="button" id="switchForm" class="btn btn-info btn-sm mb-2 pe-2"><span><i class="fas fa-random"></i></span> Switch Form</button>
        <!-- <button type="button" id="switchForm1" class="btn btn-info btn-sm mb-2 pe-2"><span><i class="fas fa-plus"></i></span> ADD SO</button> -->
        </div>
        <form id="saveform" >
            <select class="form-control personnel"id="personnel" name="personnel">
            </select>
            <input class="form-control mb-1" type="text" id="position" name="position" placeholder="Position" >
            <input class="form-control mb-1" type="text" id="school" name="school" placeholder="School" >
            <select class="form-control mb-1" name="purpose" id="purpose" required>
                <option style="color:gray" disabled selected>Select Purpose</option>
                <option value="Retirement">Retirement</option>
                <option value="Deceased">Deceased</option>
                <option value="Transfer">Transfer</option>
                <option value="Resign">Resign</option>
            </select>
            <input class="form-control mb-1" type="text"id="status" name="status" placeholder="Status" >
            <input class="form-control mb-1" type="text"id="effectivity" name="effectivity" placeholder="Effectivity" >
            <input class="form-control mb-1" type="text"id="so_number" name="so_number" placeholder="SO Number" >
            <input class="form-control mb-1" type="text"id="control" name="control" placeholder="Control #" >
            <input class="form-control mb-1" type="date"id="date" name="date" placeholder="DATE" >
            <button type="button" id="save" class="btn btn-secondary btn-sm btn-block my-2 save" name="save">SAVE</button>
            <a class="btn btn-danger btn-sm btn-block my-2" onclick="swal.close()">Cancel</a>
        </form>

        <form id="saveform1" style="display:none">
            <input class="form-control mb-1" type="text" id="name1" name="name1" placeholder="Name">
            <input class="form-control mb-1" type="text" id="mname1" name="mname1" placeholder="Middlename">
            <input class="form-control mb-1" type="text" id="lname1" name="lname1" placeholder="Lastname">
            <input class="form-control mb-1" type="text" id="position1" name="position1" placeholder="Position" >
            <input class="form-control mb-1" type="text" id="school1" name="school1" placeholder="School" >
            <select class="form-control mb-1" name="purpose" id="purpose1" required>
                <option style="color:gray" disabled selected>Select Purpose</option>
                <option value="Retirement">Retirement</option>
                <option value="Deceased">Deceased</option>
                <option value="Transfer">Transfer</option>
                <option value="Resign">Resign</option>
            </select>
            <input class="form-control mb-1" type="text"id="status1" name="status1" placeholder="Status" >
            <input class="form-control mb-1" type="text"id="effectivity1" name="effectivity1" placeholder="Effectivity" >
            <input class="form-control mb-1" type="text"id="so_number1" name="so_number1" placeholder="SO Number" >
            <input class="form-control mb-1" type="text"id="control1" name="control1" placeholder="Control #" >
            <input class="form-control mb-1" type="date"id="date1" name="date1" placeholder="DATE" >
            <button type="button" id="save1" class="btn btn-secondary btn-sm btn-block my-2 save1" name="save1">SAVE</button>
            <a class="btn btn-danger btn-sm btn-block my-2" onclick="swal.close()">Cancel</a>
        </form>

        <form id="saveform2" style="display:none">
            <select class="form-control personnel1"id="personnel1" name="personnel1">
            </select>
            <input class="form-control" type="file" name="so">
            <button type="button" id="save1" class="btn btn-secondary btn-sm btn-block my-2 save1" name="save1">SAVE</button>
            <a class="btn btn-danger btn-sm btn-block my-2" onclick="swal.close()">Cancel</a>
        </form>
    </div>
</body>
</html>
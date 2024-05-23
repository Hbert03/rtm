
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
</head>
<body>
    <div>
        <form id="saveform" >
            <select class="form-control personnel"id="personnel" name="personnel">
            </select>
            <input class="form-control mb-1" type="text" id="position" name="position" placeholder="Position" >
            <input class="form-control mb-1" type="text" id="school" name="school" placeholder="School" >
            <input class="form-control mb-1" type="text"id="purpose" name="purpose" placeholder="Purpose" >
            <input class="form-control mb-1" type="text"id="status" name="status" placeholder="Status" >
            <input class="form-control mb-1" type="text"id="effectivity" name="effectivity" placeholder="Effectivity" >
            <input class="form-control mb-1" type="text"id="so_number" name="so_number" placeholder="SO Number" >
            <input class="form-control mb-1" type="text"id="control" name="control" placeholder="Control #" >
            <input class="form-control mb-1" type="date"id="date" name="date" placeholder="DATE" >
            <button type="button" id="save" class="btn btn-secondary btn-sm btn-block my-2 save" name="save">SAVE</button>
            <a class="btn btn-danger btn-sm btn-block my-2" onclick="swal.close()">Cancel</a>
        </form>
    </div>
</body>

</html>
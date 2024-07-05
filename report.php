<?php include('header.php'); ?>
 


      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item menu-open">
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="index.php" class="nav-link ">
                  <i class="fa fa-tachometer-alt"></i>
                  <p>Dashboard</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link active">
                  <i class="fa fa-book"></i>
                  <p>Report</p>
                </a>
              </li>
            </ul>
          </li>
         
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>

  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">LIST</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div style="font-size:18px" class="card-header bg-secondary">
            <h3 class="card-title">Personnel Retired List</h3>
          </div>
          <!-- /.card-header -->
          <div class="card-body">
            <div class="tabs">
              <ul class="nav nav-tabs mb-3" id="personnelTabs" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active " id="tab1-tab" data-toggle="tab" href="#tab1" role="tab" aria-controls="tab1" aria-selected="true">Latest</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="tab2-tab" data-toggle="tab" href="#tab2" role="tab" aria-controls="tab2" aria-selected="false">2019 year below</a>
                </li>
              </ul>
              <div class="tab-content" id="personnelTabsContent">
                <div class="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
                  <!-- Content for Tab 1 -->
                  <div class="table-responsive">
                    <table id="retirement_table" class="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Lastname</th>
                          <th>Position</th>
                          <th>School</th>
                          <th>Purpose</th>
                          <th>Status</th>
                          <th>Effectivity</th>
                          <th>SO Numbers</th>
                          <th>Control Number</th>
                          <th>Date</th>
                          <th>EDIT</th>
                          <th>DELETE</th>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
                  </div>
                </div>
                <div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
                <div class="table-responsive">
                    <table id="retirement_table1" class="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Middlename</th>
                          <th>Lastname</th>
                          <th>Position</th>
                          <th>School</th>
                          <th>Purpose</th>
                          <th>Status</th>
                          <th>Effectivity</th>
                          <th>SO Numbers</th>
                          <th>Control Number</th>
                          <th>Date</th>
                          <th>EDIT</th>
                          <th>DELETE</th>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /.card-body -->
        </div>
        <!-- /.card -->
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->
  </div>
  <!-- /.container-fluid -->
</section>

    <!-- /.content -->
  </div>

  
  <!-- /.content-wrapper -->

   
  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
  <!-- /.control-sidebar -->

 <?php include('footer.php'); ?>

<!-- содержимое страницы -->
<div class="container-fluid h-100 m-0 p-0">

    <!-- верхняя часть страницы -->
    <div class="container-fluid m-0 p-0" style="background-color: #4e8398">
    
        <!-- лого страницы -->
        <?php include("../plugins/logo.php"); ?>

        <!-- заголовок страницы -->
        <div class="row justify-content-center p-4">

            <div class="col-12 col-md-8 col-lg-6 lead text-center text-white">
                <h2> To find free tickets please choose your departure and destination airports. </h2>
            </div>

        </div>
        
        <!-- шаг -->
        <div class="row justify-content-center mt-4 text-center text-white">
            <p> Step 1 of 5 </p>
        </div>

        <!-- поле ввода начального аэропорта -->
        <div class="row justify-content-center">

            <div class="col-12 col-md-10 col-lg-8">

                <div class="form-group m-0 p-0">

                    <input type="text" class="form-control bg-light text-left text-black" placeholder="Where from?" id="airports-from">     
                    <ul class="list-group list-group-flush" style="max-height: 200px; overflow-y: auto; display: none;" id="airports-from_tips"></ul>   

                </div>

            </div>

        </div>

        <!-- поле ввода конечного аэропорта -->
        <div class="row justify-content-center">

            <div class="col-12 col-md-10 col-lg-8">

                <div class="form-group m-0 p-0">

                    <input type="text" class="form-control bg-light text-left text-black" placeholder="Where to?" id="airports-to">     
                    <ul class="list-group list-group-flush" style="max-height: 200px; overflow-y: auto; display: none;"  id="airports-to_tips"></ul>     

                </div>

            </div>

        </div>

        <!-- предупреждения -->
        <div class="row justify-content-center p-2" id="airports-info_warning_block" style="display: none;">
            <div class="col-12 col-md-8 col-lg-6 alert alert-warning text-center" role="alert" id="airports-info_warning" style="display: none;"></div>
        </div>

        <div class="row justify-content-center p-2" id="airports-info_danger_block" style="display: none;">
            <div class="col-12 col-md-8 col-lg-6 alert alert-danger text-center" role="alert" id="airports-info_danger" style="display: none;"></div>
        </div>

        <!-- кнопки -->
        <div class="row justify-content-center p-3">
            <button class="col-4 col-md-2 col-lg-1 btn" id="airports-button_goto_next" ><b> NEXT </b></button>
        </div>
    
    </div>
    
    <!-- нижняя часть страницы -->
    <?php include("../plugins/footer.php"); ?>

</div>
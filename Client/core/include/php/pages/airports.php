
<!-- содержимое страницы -->
<div class="container-fluid h-100 m-0 p-0">

    <!-- верхняя часть страницы -->
    <div class="container-fluid m-0 p-0" style="background-color: #4e8398">
    
        <!-- лого страницы -->
        <div class="container-fluid h-100 m-0 mb-4 p-0">
            
            <div class="row justify-content-center">
                
                <div class="col-12 m-0 p-0" style="background-color: #799c95;">
                    <div class="p-4"></div>
                </div>
                
            </div>
            
            <div class="row justify-content-center">
                
                <div class="col-12 col-lg-6 m-0 p-0">
                    <div class="logo" id="airports-logo"><img src="/core/include/style/images/basic/main_logo.png"></div>
                </div>
                
            </div>
            
        </div>

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
    <div class="container-fluid m-0 p-0" style="background-color: #0a3446">
        
        <!-- ссылки -->
        <div class="row justify-content-center m-0 p-4 text-center text-white">

            <div class="col-12 col-md-8">
            
                <div class="container-fluid">
                    
                    <div class="row justify-content-center m-auto text-center">
                        
                        <button class="col-5 col-md-4 m-1 btn btn-link text-white"><b> About </b></button>
                        
                        <button class="col-5 col-md-4 m-1 btn btn-link text-white"><b> Contact </b></button>
                        
                    </div>
                
                </div>
            
            </div>

        </div>
        
        <!-- копирайт -->
        <div class="row justify-content-center m-0 mt-4 p-0 text-center text-white small">

            <div class="col-10">
                <p> &copy; 2017 Airbonus. All right reserved. </p>
            </div>

        </div>
        
        <!-- правила -->
        <div class="row justify-content-center m-0 p-0 text-center text-white small">

            <div class="col-10">
                <p><u> Terms &amp; Conditions </u></p>
            </div>

        </div>
        
    </div>

</div>
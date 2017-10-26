<!-- размытый фон -->
<div class="blur-content">

    <!-- содержимое страницы -->
    <div class="container">

        <!-- лого страницы -->
        <div class="row justify-content-center">
            <div id="airports-logo"><img src="/core/include/style/images/basic/main_logo.png"></div>
        </div>

        <!-- заголовок страницы -->
        <div class="row justify-content-center">

            <div class="col display-4 text-center">
                <p>
                    <b> Pilot Project </b>
                </p>
            </div>

        </div>
        
        <!-- поле ввода начального аэропорта -->
        <div class="row justify-content-center">

            <div class="col-12 col-lg-10">
                
                <div class="form-group">
                    
                <input type="text" class="form-control bg-light text-center text-black" placeholder="Where from?" id="airports-from">     
                    <select class="form-control" id="airports-from_tips"></select>     
                </div>
                
            </div>

        </div>
        
        <!-- поле ввода конечного аэропорта -->
        <div class="row justify-content-center">

            <div class="col-12 col-lg-10">
                
                <div class="form-group">
                    
                <input type="text" class="form-control bg-light text-center text-black" placeholder="Where to?" id="airports-to">     
                    <select class="form-control" id="airports-to_tips"></select>     
                </div>
                
            </div>

        </div>
        
        <!-- предупреждения -->
        <div class="row justify-content-center" id="airports-info_warning_block">
            <div class="col-md-8 alert alert-warning text-center" role="alert" id="airports-info_warning"></div>
        </div>
        
        <div class="row justify-content-center" id="airports-info_danger_block">
            <div class="col-md-8 alert alert-danger text-center" role="alert" id="airports-info_danger"></div>
        </div>
        
        <!-- кнопки -->
        <div class="row justify-content-center">
            <button class="col-8 col-md-6 btn btn-primary btn-sm" id="airports-button_goto_next" ><p><b> GO </b></p></button>
        </div>

    </div>

</div>
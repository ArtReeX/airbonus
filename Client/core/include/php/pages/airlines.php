<!-- содержимое страницы -->
<div class="container-fluid h-100 m-0 p-0">

    <!-- верхняя часть страницы -->
    <div class="wrapper container-fluid m-0 p-0 bg-content">
    
        <!-- лого страницы -->
        <?php include("../plugins/logo.php"); ?>

        <!-- заголовок страницы -->
        <div class="row justify-content-center p-4">

            <div class="col-12 col-md-8 col-lg-6 lead text-center text-white" id="airlines-head">
                <h1> Great! We found the airlines! </h1>
            </div>

        </div>
        
        <!-- подзаголовок страницы -->
        <div class="row justify-content-center p-4">

            <div class="col-12 col-md-8 col-lg-6 lead text-center text-white" id="airlines-subhead">
                <p> The following airlines fly from your airport to the resort of your choice, which have special credit card programs. We will check which credit cards you can apply for to get your flights free of charge. </p>
            </div>

        </div>

        <!-- список с авиалиниями  -->
        <div class="row justify-content-center hidden" id="airlines-list">

            <div class="col-12 col-lg-8">

                <!-- список компаний -->
                <div class="card-body">
                    
                    <!-- список -->           
                    <ul class="list-group list-group-flush lead text-white" id="airlines-list_companies"></ul>
                    
                    <!-- счётчик количества доступных компаний -->        
                    <div class="row justify-content-center">
                        <div class="col-12 card-subtitle m-2 text-white text-right">
                            <div id="airlines-list_count"> Total of 0 companies </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
        
        <!-- кнопки -->
        <div class="row justify-content-center m-0 p-0 pb-2 text-center text-white">

            <div class="col-10 col-lg-8">
            
                <div class="container-fluid">
                    
                    <div class="row justify-content-center m-auto text-center">
                        
                        <button class="col-5 col-md-3 col-lg-2 btn text-white" id="airlines-button_goto_back" ><b> BACK </b></button>
                        
                        <button class="col-5 col-md-3 col-lg-2 ml-auto btn text-white" id="airlines-button_goto_next" ><b> NEXT </b></button>
                        
                    </div>
                
                </div>
            
            </div>

        </div>
    
    </div>
    
    <!-- нижняя часть страницы -->
    <?php include("../plugins/footer.php"); ?>

</div>
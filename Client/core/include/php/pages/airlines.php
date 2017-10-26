<!-- размытый фон -->
<div class="blur-content">

    <!-- содержимое страницы -->
    <div class="container">

        <!-- лого страницы -->
        <div class="row justify-content-center">
            <div id="airlines-logo"><img src="/core/include/style/images/basic/main_logo.png"></div>
        </div>

        <!-- заголовки страницы -->

        <div class="row justify-content-center">

            <div class="col display-4 text-center" id="airlines-head">
                <p><b> Great! We found the airlines! </b></p>
            </div>

        </div>
        
        <div class="row justify-content-center">

            <div class="col lead text-center" id="airlines-subhead">
                <p>The following airlines fly from your airport to the resort of your choice, which have special credit card programs. We will check which credit cards you can apply for to get your flights free of charge. </p>
            </div>

        </div>
        
        <!-- список с авиалиниями  -->
        <div class="row justify-content-center" id="airlines-list">

            <div class="col-12 col-lg-10">

                <!-- список компаний -->
                <div class="card-body">
                    
                    <!-- список -->
                    <div class="row justify-content-center">
                        <div class="col-12 card-text text-left">
                            <div id="airlines-list_companies"> </div>
                        </div>
                    </div>
                    
                    <!-- разделитель -->
                    <hr class="my-4">
                    
                    <!-- счётчик количества доступных компаний -->        
                    <div class="row justify-content-center">
                        <div class="col-12 card-subtitle mb-2 text-muted text-right">
                            <div id="airlines-list_count"> Total of 0 companies </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
        
        <!-- кнопки -->
        <div class="row justify-content-between">
            
            <!-- кнопка возврата на предыдущую страницу -->
            <div class="col-1" id="airlines-button_goto_back">
                <i class="fa fa-chevron-circle-left fa-2x" aria-hidden="true"></i>
            </div>
            
            <!-- кнопка перехода на следующую страницу -->
            <div class="col-1 ml-auto" id="airlines-button_goto_next">
                <i class="fa fa-chevron-circle-right fa-2x" aria-hidden="true"></i>
            </div>
            
        </div>

    </div>

</div>
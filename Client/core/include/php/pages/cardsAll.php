<!-- размытый фон -->
<div class="blur-content">

    <!-- содержимое страницы -->
    <div class="container">

        <!-- лого страницы -->
        <div class="row justify-content-center">
            <div id="cardsAll-logo"><img src="/core/include/style/images/basic/main_logo.png"></div>
        </div>

        <!-- заголовок страницы -->
        <div class="row justify-content-center">

            <div class="col h1 text-center">
                <p><b> Do you currently have any of these cards? </b></p>
            </div>

        </div>
        
        <!-- список доступных к выбору кредитных рейтингов -->
        <div class="row justify-content-center">
            
            <div class="col p-0 text-center">
                
                <table class="table table-bordered">

                    <!-- заголовок таблицы -->
                    <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">View</th>
                      <th scope="col">Mile</th>
                    </tr>
                    </thead>

                    <!-- варианты карт -->
                    <tbody id="cardsAll-table"></tbody>

                </table>
                
            </div>

        </div>
        
        <!-- предупреждения -->
        <div class="row justify-content-center" id="cardsAll-info_warning_block">
            <div class="col-md-8 alert alert-warning text-center" role="alert" id="cardsAll-info_warning"></div>
        </div>
        
        <div class="row justify-content-center" id="cardsAll-info_danger_block">
            <div class="col-md-8 alert alert-danger text-center" role="alert" id="cardsAll-info_danger"></div>
        </div>
        
        <!-- кнопки -->
        <div class="row justify-content-between">
            
            <!-- кнопка возврата на предыдущую страницу -->
            <div class="col-3 col-lg-2 text-center" id="cardsAll-button_goto_back">
                <i class="fa fa-chevron-circle-left fa-2x" aria-hidden="true"></i>
            </div>
            
            <!-- кнопка перехода на следующую страницу -->
            <div class="col-3 col-lg-2 ml-auto text-center" id="cardsAll-button_goto_next">
                <i class="fa fa-check-circle fa-2x" aria-hidden="true"></i>
            </div>
            
        </div>

    </div>

</div>
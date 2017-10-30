<!-- размытый фон -->
<div class="blur-content">

    <!-- содержимое страницы -->
    <div class="container">

        <!-- лого страницы -->
        <div class="row justify-content-center">
            <div id="cardsAmEx-logo"><img src="/core/include/style/images/basic/main_logo.png"></div>
        </div>

        <!-- заголовок страницы -->
        <div class="row justify-content-center">

            <div class="col h1 text-center">
                <p><b> Have you EVER had any of the American Express cards? </b></p>
            </div>

        </div>
        
        <!-- список доступных к выбору кредитных рейтингов -->
        <div class="row justify-content-center">
            
            <div class="col p-0 text-center">
                
                <table class="table table-responsive table-active table-bordered">
                    
                    <!-- заголовок таблицы -->
                    <thead>
                    <tr>
                      <th>Name</th>
                      <th>View</th>
                      <th>Mile</th>
                    </tr>
                    </thead>
                    
                    <!-- варианты карт -->
                    <tbody id="cardsAmEx-table"></tbody>
                    
                </table>
                
            </div>

        </div>
        
        <!-- предупреждения -->
        <div class="row justify-content-center" id="cardsAmEx-info_warning_block">
            <div class="col-md-8 alert alert-warning text-center" role="alert" id="cardsAmEx-info_warning"></div>
        </div>
        
        <div class="row justify-content-center" id="cardsAmEx-info_danger_block">
            <div class="col-md-8 alert alert-danger text-center" role="alert" id="cardsAmEx-info_danger"></div>
        </div>
        
        <!-- кнопки -->
        <div class="row justify-content-between">
            
            <!-- кнопка возврата на предыдущую страницу -->
            <div class="col-3 col-lg-2 text-center" id="cardsAmEx-button_goto_back">
                <i class="fa fa-chevron-circle-left fa-2x" aria-hidden="true"></i>
            </div>
            
            <!-- кнопка перехода на следующую страницу -->
            <div class="col-3 col-lg-2 ml-auto text-center" id="cardsAmEx-button_goto_next">
                <i class="fa fa-check-circle fa-2x" aria-hidden="true"></i>
            </div>
            
        </div>

    </div>

</div>
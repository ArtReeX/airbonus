<!-- содержимое страницы -->
<div class="container-fluid h-100 m-0 p-0">

    <!-- верхняя часть страницы -->
    <div class="wrapper container-fluid m-0 p-0 bg-white">
    
        <!-- лого страницы -->
        <?php include("../plugins/logo.php"); ?>

        <!-- заголовок страницы -->
        <div class="row justify-content-center p-4">

            <div class="col-12 col-md-8 col-lg-6 lead text-center text-dark">
                <h3> The following information is required to determine your eligibility for credit cards. Banks usually do not validate your income, but your may want to be accurate. </h3>
            </div>

        </div>
        
        <!-- подзаголовок страницы -->
        <div class="row justify-content-center p-4">

            <div class="col-12 col-md-8 col-lg-6 lead text-center text-dark">
                <p> 
                    You can find your credit score at:  
                    <a href="https://www.annualcreditreport.com/" target="_blank"> AnnualCreditReport.com </a>
                    <br> (the only website authorized to fill orders for your free annual credit report).
                    <br> <span class="badge badge-secondary"> Note: </span> Banks usually checks the credit score of credit card applicants. 
                </p>
            </div>

        </div>
        
        <!-- кнопки -->
        <div class="row justify-content-center m-0 p-0 pb-2 text-center text-white">

            <div class="col-10 col-lg-8">
            
                <div class="container-fluid">
                    
                    <div class="row justify-content-center m-auto text-center">
                        
                        <button class="col-5 col-md-3 col-lg-2 btn text-white" id="preScores-button_goto_back" ><b> BACK </b></button>
                        
                        <button class="col-5 col-md-3 col-lg-2 ml-auto btn text-white" id="preScores-button_goto_next" ><b> NEXT </b></button>
                        
                    </div>
                
                </div>
            
            </div>

        </div>
    
    </div>
    
    <!-- нижняя часть страницы -->
    <?php include("../plugins/footer.php"); ?>

</div>
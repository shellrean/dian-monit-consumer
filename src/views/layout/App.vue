<template>
	<div>
        <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <div class="d-flex align-items-center">
                        <div class="symbol symbol-40 symbol-light-primary symbol-sm flex-shrink-0">    
                            <span class="symbol-label font-size-h4 font-weight-bold ">
                                <img src="/img/dki.png" height="35" class="d-inline-block align-top" alt="" loading="lazy">
                            </span>                             
                        </div>                              
                        <div class="ml-4 d-flex flex-column">                                   
                            <div class="text-dark-75 text-hover-primary font-weight-bolder font-size-lg mb-0" >
                                Extrarodinary
                            </div>                                 
                            <span class="text-muted font-weight-bold">Monitoring</span>    
                        </div>                          
                    </div>
                  </a>
            </div>
        </nav>
        <section>
        	<router-view />
        </section>
        <div class="mt-5">
            <p class="text-center p-5">
                &copy; 2020 Extraordinary Monitoring
            </p>
        </div>
    </div>
</template>
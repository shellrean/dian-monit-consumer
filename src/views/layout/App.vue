<template>
	<div>
        <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-none border">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <div class="d-flex align-items-center">
                        <div class="symbol symbol-40 symbol-light-primary symbol-sm flex-shrink-0">    
                            <span class="symbol-label font-size-h4 font-weight-bold ">
                                <img src="/img/logo.jpeg" height="35" class="d-inline-block align-top" alt="" loading="lazy">
                            </span>                             
                        </div>                              
                        <div class="ml-4 d-flex flex-column">                                   
                            <div class="text-dark-75 text-hover-primary font-weight-bolder font-size-lg mb-0" >
                                Extrarodinary
                            </div>                                 
                            <span class="text-muted font-weight-bold">Master</span>    
                        </div>                          
                    </div>
                  </a>
            </div>
        </nav>
        <section>
            <div class="container-fluid mt-4">
                <div class="row">
                    <div class="col-md-12">
                        <ul class="nav nav-tabs">
                            <li class="nav-item">
                                <router-link class="nav-link" active-class="active" :to="{ name: 'home' }">Dashboard</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" active-class="active" :to="{ name: 'monit' }">Time Monitoring</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        	<router-view />
        </section>
        <div class="mt-5">
            <p class="text-center p-5">
                &copy; 2020 Extraordinary Master
            </p>
        </div>
    </div>
</template>
<template>
    <div class="content">
        <div class="container-fluid" v-if="accomodations.length >0">
            <div v-for="(accomodation, index) in accomodations" :key="index" >
                <div class="row">
                    <div class="col-md-12 ml-auto mr-auto">
                       <AccomodationCard :fetchedAccomodation="accomodation"></AccomodationCard>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>
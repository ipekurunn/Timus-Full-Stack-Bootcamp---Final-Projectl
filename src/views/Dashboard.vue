<template>
    <div class="dashboard">
        <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
            <h3>Dashboard</h3>
            <v-btn color="hex">
                View Orders
            </v-btn>
        </v-subheader>
        <br>
        <v-row>
            <v-col lg="7" cols="12">
                <v-alert dense text type="success">
                    Login Successfully! Welcome to <strong>EcoEnergy</strong>
                </v-alert>
                <v-row>
                    <v-col lg="12" cols="12">
                    <v-card>
                    <v-data-table
                            caption="Enerji Holding - Details"
                            :headers="header"
                            :items="details"
                            :items-per-page="5"
                            class="elevation-1"
                    >
                        <template v-slot:item.action="">
                            <v-btn color="success" outlined small shaped >Edit</v-btn>
                        </template>
                    </v-data-table>
                    </v-card>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" lg="5">
                <v-card>
                    <v-card-title>Activities</v-card-title>
                    <v-card-text class="py-0">
                        <v-timeline align-top dense>
                            <v-timeline-item color="indigo" small>
                                <strong>5 Minutes ago</strong>
                                <div class="text-caption">
                                   You made changes to Enerji Holding
                                </div>
                            </v-timeline-item>
                            <v-timeline-item color="green" small>
                                <strong>35 Minutes ago</strong>
                                <div class="text-caption mb-2">
                                    You changed your profile picture
                                </div>
                            </v-timeline-item>

                            <v-timeline-item color="indigo" small>
                                <strong>44 Minuts ago</strong>
                                <div class="text-caption">
                                    You made a detail change in Factory List
                                </div>
                            </v-timeline-item>
                        </v-timeline>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-data-table
                            caption="Factory List"
                            :headers="headers"
                            :items="names"
                            :items-per-page="5"
                            class="elevation-1"
                    >
                        <template v-slot:item.freeMember="{ item }">
                            <span v-if="item.freeMember" style="color: green;">Free</span>
                            <span v-else style="color: red;">Plus</span>
                        </template>
                        <template v-slot:item.action="">
                            <v-btn color="success" outlined small shaped >Edit</v-btn>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>


<script>
    export default {
        name: "Dashboard",
        data() {
            return {
                header: [
                    {text: 'Using Unit', align: 'start', sortable: false,value: 'usingUnit'},
                    {text: 'Date Range', value: 'dateRange'},
                    {text: 'Usage(kw)', value: 'usageKw'},
                    {text: 'Usage Fee', value: 'usageFee'},
                    {text: 'Discount Price', value: 'discountPrice'},
                    {value: 'action'},
                ],
                details: [
                    {
                        usingUnit: 'İşletme Departmanı',
                        dateRange: '01.01.2023 / 31.12.2023',
                        usageKw: 5000,
                        usageFee: '7500 ₺',
                        discountPrice: '6000 ₺,'
                    },
                ],
                headers: [
                    {text: 'Name', align: 'start', sortable: false,value: 'name'},
                    {text: 'Membership Date', value: 'membershipDate'},
                    {text: 'Membership Expiration Date', value: 'membershipExpDate'},
                    {text: 'Number of Employees', value: 'numOfEmployees'},
                    {text: 'Free Member', value: 'freeMember'},
                    {value: 'action'},
                ],
                names: [
                    {
                        name: 'Acme Teknoloji A.Ş.',
                        membershipDate: '15.03.2020',
                        membershipExpDate: '15.03.2023',
                        numOfEmployees: 100,
                        freeMember: true,
                    },
                    {
                        name: 'Global İnşaat Ltd. Şti.',
                        membershipDate: '01.06.2019',
                        membershipExpDate: '01.06.2024',
                        numOfEmployees: 250,
                        freeMember: false,
                    },
                    {
                        name: 'Mega Gıda Ticaret A.Ş.',
                        membershipDate: '10.12.2021',
                        membershipExpDate: '10.12.2022',
                        numOfEmployees: 50,
                        freeMember: true,
                    },
                    {
                        name: 'Enerji Holding',
                        membershipDate: '05.09.2018',
                        membershipExpDate: '05.09.2023',
                        numOfEmployees: 500,
                        freeMember: true,
                    },
                    {
                        name: 'Prodan Danışmanlık Ltd. Şti.',
                        membershipDate: '20.11.2017',
                        membershipExpDate: '20.11.2024',
                        numOfEmployees: 150,
                        freeMember: false,
                    },
                    {
                        name: 'Teknolojik Elektronik A.Ş.',
                        membershipDate: '03.04.2019',
                        membershipExpDate: '03.04.2025',
                        numOfEmployees: 95,
                        freeMember: false,
                    },
                    {
                        name: 'Otomotiv Rüzgarı A.Ş.',
                        membershipDate: '12.08.2020',
                        membershipExpDate: '12.08.2025',
                        numOfEmployees: 300,
                        freeMember: false,
                    },
                    {
                        name: 'Eko Enerji A.Ş.',
                        membershipDate: '02.01.2022',
                        membershipExpDate: '02.01.2024',
                        numOfEmployees: 87,
                        freeMember: false,
                    },
                    {
                        name: 'Teknoloji Devi A.Ş.',
                        membershipDate: '10.09.2020',
                        membershipExpDate: '10.09.2023',
                        numOfEmployees: 200,
                        freeMember: true,
                    },
                    {
                        name: 'Yapı İnşaat Grubu Ltd. Şti.',
                        membershipDate: '05.05.2019',
                        membershipExpDate: '05.05.2024',
                        numOfEmployees: 350,
                        freeMember: true,
                    },
                ],
                options: {
                    theme: "light2",
                    animationEnabled: true,
                    title: {
                        text: "Website Visitor Analysis"
                    },
                    axisY: {
                        title: "Number of Visits",
                    },
                    axisX: {
                        valueFormatString: "DD MMM"
                    },
                    toolTip: {
                        shared: true
                    },
                    legend: {
                        cursor: "pointer",
                        itemclick: this.toggleDataSeries
                    },
                    data: [{
                        type: "splineArea",
                        name: "Total Visit",
                        showInLegend: true,
                        color: "#9FA8DA",
                        xValueType: "dateTime",
                        dataPoints: [
                        { x: 1651343400000, y: 1100 },
                        { x: 1651429800000, y: 700 },
                        { x: 1651516200000, y: 943 },
                        { x: 1651602600000, y: 658 },
                        { x: 1651689000000, y: 734 },
                        { x: 1651775400000, y: 963 },
                        { x: 1651948200000, y: 847 },
                        { x: 1652034600000, y: 1500 },
                        { x: 1652121000000, y: 869 },
                        { x: 1652207400000, y: 710 },
                        { x: 1652293800000, y: 970 },
                        { x: 1652380200000, y: 1050 },
                        { x: 1652466600000, y: 1300 },
                        { x: 1652553000000, y: 1400 }
                        ]
                    }, {
                        type: "splineArea",
                        name: "Unique Visit",
                        showInLegend: true,
                        color: "#26C6DA",
                        xValueType: "dateTime",
                        dataPoints: [
                        { x: 1651343400000, y: 700 },
                        { x: 1651429800000, y: 560 },
                        { x: 1651516200000, y: 540 },
                        { x: 1651602600000, y: 400 },
                        { x: 1651689000000, y: 544 },
                        { x: 1651775400000, y: 693 },
                        { x: 1651948200000, y: 657 },
                        { x: 1652034600000, y: 1330 },
                        { x: 1652121000000, y: 639 },
                        { x: 1652207400000, y: 506 },
                        { x: 1652293800000, y: 660 },
                        { x: 1652380200000, y: 906 },
                        { x: 1652466600000, y: 900 },
                        { x: 1652553000000, y: 1001 }
                        ]
                    }]
                    },
                    styleOptions: {
                    width: "100%",
                    height: "360px"
                    }
            }
        },
        methods: {
            onButtonClick(item) {
                console.log('click on ' + item.no)
            },
            toggleDataSeries(e) {
                if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                    e.dataSeries.visible = false;
                }
                else {
                    e.dataSeries.visible = true;
                }
                e.chart.render();
            }
        }

    }
</script>

<style scoped>
    .overlap-icon {
        position: absolute;
        top: -33px;
        text-align: center;
        padding-top: 12px;
    }
    .dashboard .v-alert.success {
    color: #FFFFFF !important; /* Beyaz veya istediğiniz renk kodunu kullanın */
    background-color: #4CAF50 !important; /* Vuetify'nin yeşil rengini değiştirmek için */
    }
</style>
function updateStartup() {
    var startupData = {
        "startup": {
            "title": $("#startupName").val(),
            "consumerId": parseInt('<%= authProfile.id %>'),
            "description": $("#description").text(),
            "logoImageUrl": "",
            "webPage": $("#webPage").val(),
            "cooperationCompanies": $("#cooperation").val(),
            "competingCompanies": $("#competing-companies").val(),
            "phoneNumber": $("#phoneNumber").val(),
            "email": "",
            "products": $("#other-products").val(),
            "meetingDate": "2018-06-11",//$("#meeting-date").val(),
            "sectorId": parseInt($("#sector").val()),
            "countryId": parseInt($("#countryName").val()),
            "statusId": parseInt($("#status").val())
        },
        "documents": [],
        "tags": getTag(),
        "groups": horizonList,
        "entrepreneurs": entrepreneursList,
        "capitalAndPartners" :capitalAndPartnersList
    }
    console.log(startupData);
   $.ajax({
        type: 'POST',
        dataType: "json",
        data: JSON.stringify(startupData),
        contentType: 'application/json; charset=utf-8',
        url: '/controller/update/<%= data.startup.id %>',
        success: function (data) {

            console.log(data);
            $(".message-box-success").toggle(750, function () {
                setTimeout(function () {
                    $(".message-box-success").toggle(750);
                }, 3000);
            });
        },
        error: function (data) {
            console.log(data)
            $(".message-box-danger").toggle(750, function () {
                setTimeout(function () {
                    $(".message-box-danger").toggle(750);
                }, 2500);
            });
        }
    });
}

function getTag() {
    var allTag = [];
    var tags = String($("#tagInput").val()).split(',');
    for (i = 0; i < tags.length; i++) {
        allTag.push({
            "name": tags[i]
        });
    }
    return allTag;
}

var horizonList = [];
var userHorizonList = JSON.parse('<%- JSON.stringify(data.groups) %>');
for (i = 0; i < userHorizonList.length; i++) {
    horizonList.push({
        "groupId": userHorizonList[i].groupId,
        "horizon": userHorizonList[i].horizon
    })
}

function addHorizonListItem() {
    var horizonID = $('#horizon').val();
    var groupID = $('#group').val();
    var groupName = $("#group option:selected").text();
    var isThere = false
    for (i = 0; i < horizonList.length; i++) {
        if (horizonList[i].groupId == parseInt(groupID) && horizonList[i].horizon == parseInt(horizonID)) {
            isThere = true
        }
    }
    if(!isThere){

            $(".horizon-list").append(
                "<div class='col-sm-12 horizon-list-item-" + groupID + "-" + horizonID +
                "' style='margin-top:5px;'>" + groupName +
                "&#8594; Horizon " + horizonID +
                "<a onclick='deleteHorizonListItem(`" + groupID + "-" + horizonID +
                "`)'>&nbsp;<i style='color: red;' class='fas fa-minus-circle'></i></a></div>"
            )
            horizonList.push({
                "groupId": parseInt(groupID),
                "horizon": parseInt(horizonID)
            })
    }
    console.log(horizonList);
}

function deleteHorizonListItem(deletedItemID) {
    $(".horizon-list-item-" + deletedItemID).remove();
    var grouphorizonids = String(deletedItemID).split("-")
    console.log(grouphorizonids)
    for(i=0;i<horizonList.length;i++){
        if(horizonList[i].groupId == grouphorizonids[0] && horizonList[i].horizon == grouphorizonids[1]){
            console.log("buldum")
            horizonList = horizonList.slice(0, i).concat(horizonList.slice(i+1, horizonList.length))
        }
    }
    console.log(horizonList);
}

var capitalAndPartnersList = [];
var userCapitalAndPartnersList = JSON.parse('<%- JSON.stringify(data.capitalAndPartners) %>');
for (i = 0; i < userCapitalAndPartnersList.length; i++) {
    capitalAndPartnersList.push({
        "companyName": userCapitalAndPartnersList[i].companyName,
        "share": userCapitalAndPartnersList[i].share
    })
}

function addCapitalandPartners(){
    var companyName = $("#capCompanyName").val();
    var shareValue = $("#capShare").val();

    var isThere = false
    for (i = 0; i < capitalAndPartnersList.length; i++) {
        if (capitalAndPartnersList[i].companyName == companyName) {
            isThere = true
        }
    }
    if(!isThere){

            $(".capitalpartners-list").append(
                "<div class='col-sm-12 capitalpartners-item-" + companyName +
                "' style='margin-top:5px;'>" + companyName +
                "&#8594; Horizon " + shareValue +
                "<a onclick='deleteCapitalandPartners(`" + companyName +
                "`)'>&nbsp;<i style='color: red;' class='fas fa-minus-circle'></i></a></div>"
            )
            capitalAndPartnersList.push({"companyName": companyName, "share": shareValue})
           
    }
    console.log(capitalAndPartnersList);
}

function deleteCapitalandPartners(deletedItemID){
    $(".capitalpartners-item-" + deletedItemID).remove();
    var capitalpartnersids = String(deletedItemID).split("-")
    console.log(capitalpartnersids)
    for(i=0;i<capitalAndPartnersList.length;i++){
        if(capitalAndPartnersList[i].companyName == capitalpartnersids[0] && capitalAndPartnersList[i].shareValue == capitalpartnersids[1]){
            console.log("buldum")
            capitalAndPartnersList = capitalAndPartnersList.slice(0, i).concat(capitalAndPartnersList.slice(i+1, capitalAndPartnersList.length))
        }
    }
    console.log(capitalAndPartnersList);
}

$(function () {
    $.get("/controller/getTags", function (res) {
        var whitelist = [];
        var tags = JSON.parse(res);
        console.log(tags);
        for (var i = 0; i < tags.length; i++) {
            whitelist.push(tags[i].tag.name);
        }
        var input1 = document.querySelector('input[name=tags]'),
            tagify1 = new Tagify(input1, {
                whitelist: whitelist,
            })

        // listen to custom 'remove' tag event
        tagify1.on('remove', onRemoveTag);

        function onRemoveTag(e) {
            console.log(e, e.detail);
        }

        function onAddTag(e) {
            console.log(e, e.detail);
        }


    })

})

function newAsset(){
    var templateAsset = $('#asset-template').html();
$('#assets').prepend(templateAsset);
$('.new-asset').hide();
}

function addAsset(){
$('.new-asset').show();
$('#addNewAsset').hide();
}

var entrepreneursList = [];
var userEntrepreneurList = JSON.parse('<%- JSON.stringify(data.entrepreneurs) %>');
for (i = 0; i < userEntrepreneurList.length; i++) {
    entrepreneursList.push({
        "fullName": userEntrepreneurList[i].fullName,
        "jobTitle": userEntrepreneurList[i].jobTitle,
        "phoneNumber": userEntrepreneurList[i].phoneNumber,
        "email": userEntrepreneurList[i].email

    })
}
console.log(entrepreneursList)
function newEntrepreneurs(){
var templateEntrepreneurs = $('#entrepreneurs-template').html();
$('.entrepreneurs').prepend(templateEntrepreneurs);
$('.new-entrepreneurs').hide();
}

function addEntrepreneurs(){
$('.new-entrepreneurs').show();
$('#addNewEntrepreneurs').hide();

$("#authority-fullName").each(function(i, fullName){
$("#authority-jobTitle").each(function(i, jobTitle){
    $("#authority-phoneNumber").each(function(i, phoneNumber){
        $("#authority-email").each(function(i, email){
            entrepreneursList.push({
                "fullName": $(fullName).val(),
                "jobTitle": $(jobTitle).val(),
                "phoneNumber": $(phoneNumber).val(),
                "email": $(email).val()
            })
        });
    });
});
});
console.log(entrepreneursList)
}

function assetGeneralEvaluationSwitch(){

}

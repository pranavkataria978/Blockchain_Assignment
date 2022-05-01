//  The file Contains the Working of UI of the page
function timeConverter(UNIX_timestamp){
  if (UNIX_timestamp === null) return "None";
  var a = new Date(UNIX_timestamp * 1000);
  return a.toLocaleString("en-US");
}


function updateUserInformation(){
    $("#total_owed").html("$"+getTotalGain(web3.eth.defaultAccount));
    $('#total_to_give').html("$" +getTotalToGive(web3.eth.defaultAccount));
    $("#last_active").html(timeConverter(getLastTimeActive(web3.eth.defaultAccount)))
}



function updateActiveWallets(){
    $("#all_users").html(getUnsettledUsers().map(function (u,i) { return "<tr><td>"+u+"</td></tr>" }));
}

function updateHistory(){
  $("#history").empty();
  id_user = $('#myaccount').val();
  transaction_list = getFinalList(id_user)

  var table = document.getElementById("history");
    var heading_row = table.insertRow(0);
    var cell1_h = heading_row.insertCell(0);
    var cell2_h = heading_row.insertCell(1);
    var cell3_h = heading_row.insertCell(2);
    var cell4_h = heading_row.insertCell(3);
    cell1_h.innerHTML = "Debitor"
    cell2_h.innerHTML = "Creditor"
    cell3_h.innerHTML =  "Amount"
    cell4_h.innerHTML =  "Transaction Slab"
  for(i = 0; i<transaction_list.length;i++){

    var answer = data(transaction_list[i])
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    if(id_user === answer[0]){
      
      cell1.style.backgroundColor = "lightblue";
    }
    if(id_user === answer[1]){
      
      cell2.style.backgroundColor = "lightblue";
    }
    cell1.innerHTML = answer[0]
    cell2.innerHTML = answer[1];
    cell3.innerHTML = answer[2]["c"][0]
    cell4.innerHTML = answer[3]


  }

  
}

// Creating Event Listeners in JavaScript for Clicks
$("#myaccount").change(function() {
    web3.eth.defaultAccount = $(this).val();
    
    updateUserInformation();
    updateHistory();
});


$("#addiou").click(function() {
  addNewTransaction($("#creditor").val(), $("#amount").val());
  updateUserInformation();
  updateHistory();
  updateActiveWallets();
});


var opts = web3.eth.accounts.map(function (a) { return '<option value="'+a+'">'+a+'</option>' })
var addresses = web3.eth.accounts.map(function(a){
  return a
})

$(".account").html(opts);
$("#wallet_addresses").html(web3.eth.accounts.map(function (a) { return '<tr><td>'+a+'</td></tr>' }))

updateUserInformation();
updateActiveWallets();

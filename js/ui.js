// =============================================================================
//                                      UI 
// =============================================================================
function timeConverter(UNIX_timestamp){
  if (UNIX_timestamp === null) return "none, no pending debits";
  var a = new Date(UNIX_timestamp * 1000);
  return a.toLocaleString("en-US");
}

function updateWhoOwes(){

    var temp;
    id_user = $('#myaccount').val();
    temp = getAssociatedTransfers(id_user);
    console.log(id_user)
    console.log(temp)
    console.log(opts)
  

}

/**
 * helper methods
 */
// this section rewrittes project starter code, but sustains core functionality
function updateUserInfo(){
    $("#total_owed").html("$"+getTotalOwed(web3.eth.defaultAccount));
    $("#last_active").html(timeConverter(getLastActive(web3.eth.defaultAccount)))
}


// This code updates the 'Users' list in the UI with the results of your function
function updateActiveUsers(){
    $("#all_users").html(getUsers().map(function (u,i) { return "<tr><td>"+u+"</td></tr>" }));
}

/**
 * event listeners
 */
$("#myaccount").change(function() {
    web3.eth.defaultAccount = $(this).val();
    updateWhoOwes();
    updateUserInfo();
});


$("#addiou").click(function() {
  add_IOU($("#creditor").val(), $("#amount").val());
  updateUserInfo();
  updateActiveUsers();
});

/**
 * execution
 */

// Allows switching between accounts in 'My Account' 
// and the 'fast-copy' in 'Address of person you owe
var opts = web3.eth.accounts.map(function (a) { return '<option value="'+a+'">'+a+'</option>' })
var addresses = web3.eth.accounts.map(function(a){
  return a
})
// console.log(addresses)
$(".account").html(opts);
$("#wallet_addresses").html(web3.eth.accounts.map(function (a) { return '<tr><td>'+a+'</td></tr>' }))

updateUserInfo();
updateActiveUsers();

//firebase config
    var firebaseConfig = {
        apiKey: "AIzaSyAnOgv1Nzjl976-eTi8YHzNvBJcJ6PA8FQ",
        authDomain: "anjacollege-mca.firebaseapp.com",
        databaseURL: "https://anjacollege-mca.firebaseio.com",
        projectId: "anjacollege-mca",
        storageBucket: "anjacollege-mca.appspot.com",
        messagingSenderId: "826288628730",
        appId: "1:826288628730:web:d70e416bd8c9bd69fc7a43",
        measurementId: "G-4R5CCRP0LC"
      };
  firebase.initializeApp(firebaseConfig);  


// Firebase Database Reference and the child
const dbRef = firebase.database().ref();
const usersRef = dbRef.child('users');





readUserData(); 
	


// --------------------------
// READ
// --------------------------
function readUserData() {


	// Firebase Database Reference and the child
	
	var database = firebase.database();
	
	//create a variable to hold our users list from firebase
	var firebaseusersCollection = database.ref().child('users');
	
	//create a 'listener' which waits for changes to the values inside the firebaseusersCollection 
	firebaseusersCollection.on('value',function(users){
		
		//create an empty string that will hold our new HTML
		var allusersHtml = "";
		var datatable = "";
	

		//console.log(arr.length);
			
		//this is saying foreach order do the following function...
		users.forEach(function(firebaseOrderReference){
		
			//this gets the actual data (JSON) for the order.
			var users = firebaseOrderReference.val();
			//console.log(users); //check your console to see it!
		

			//create html for the individual order
			
			var individialOrderHtml =	`
			
			
				<div class="ctm-border-radius shadow-sm grow card">
					<div class="card-header">
						
	
			<h4 class=" card-title d-inline-block mb-0 mt-2" name="user_id" style="color: orangered;font-family:'Exo 2', sans-serif;">`+users.name+`</h4>
			<div class="team-action-icon float-right">
				<span data-toggle="modal" data-target="#edit">
				<a href="javascript:void(0)" class="btn btn-theme text-white ctm-border-radius" title="" data-original-title="Edit"><i class="fa fa-pencil"></i></a>
				</span>
				<span data-toggle="modal" data-target="#delete">
				<a href="javascript:void(0)" class="btn btn-theme text-white ctm-border-radius" title="" data-original-title="Delete" id="Delete" ><i class="fa fa-trash"></i></a>
				</span>
			</div>
		</div>
		<div class="card-body">
		<p>`+users.designation+`</P>	
		<p>`+users.department+`</P>	
		<p>`+users.college+`</P>	
		<p>`+users.address+`</P>									
		<p>`+users.phonenumber+`</P>	
		<p>`+users.email+`</P>
		</div></div>
		<script>

function delete_user(){
	var user_id ="`+users.user_id+`";

	firebase.database().ref().child('/users/' + user_id).remove();
   }
   function update_user(){

	var user_id ="`+users.user_id+`";

	const addUserInputsUI = document.getElementsByClassName("user-inputup");
	var data = {
		user_id: user_id,
		
	   }
	
	  for (let i = 0, len = addUserInputsUI.length; i < len; i++) {
	
		let key = addUserInputsUI[i].getAttribute('data-key');
		let value = addUserInputsUI[i].value;
		data[key] = value;
		
		   
		   var updates = {};
		   updates['/users/' + user_id] = data;
		 
		 
	  }
	  
	  firebase.database().ref().update(updates, function () {
		Swal.fire({
			
			icon: 'success',
			title: 'Your work has been saved',
			showConfirmButton: false,
			timer: 1500
		  });
	  })

   }
   	</script>
		`;
		var datatablevalue=`
		
										
		<thead>
		<th>`+users.name+`</th>
		<th>`+users.designation+`</th>
		<th>`+users.department+`</th>
		<th>`+users.college+`</th>
		<th>`+users.address+`</th>
		<th>`+users.phonenumber+`</th>
		<th>`+users.email+`</th>
		</thead>
		
		`;
			
			//add the individual order html to the end of the allusersHtml list
			allusersHtml = allusersHtml + individialOrderHtml;
			datatable = datatable + datatablevalue;
			
		});
		
		//actaull put the html on the page inside the element with the id Previoususers
		$('#previoususers').html(allusersHtml);
		$('#datatable').html(datatable);
	
		
	});
		
}

// --------------------------
// ADD
// --------------------------
//$("submit").click("click", addUserBtnClicked);
function addUserBtnClicked() {
	var name = $("#name").val(); var designation = $("#designation").val(); var department = $("#department").val(); var college = $("#college").val(); var address = $("#address").val(); var phonenumber = $("#phonenumber").val(); var email = $("#email").val(); var password =$("#email").val();
	if (name != "" && designation != "" && department != "" && college != "" && address != "" && phonenumber != "" && email != "" && password !="")
	{ 
	 
	firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error)
	{var errorMessage=error.message;
	  localStorage.setItem('anjac', 'mca');
	  console.log("main");
	  Swal.fire({
		icon: 'warning',
		title: 'Oops...',
		text: 'Message:'+errorMessage,
		footer: '<a href>Why do I have this issue?</a>'
	  })
	
	}).then(function(result){
	  if("anjac" in localStorage ){
		  
		console.log("email already exit");
		localStorage.clear();
		console.clear();
  
	  }else{
		const addUserInputsUI = document.getElementsByClassName("user-input");
		var uid = firebase.database().ref().child('users').push().key;
		
		var data = {
		  user_id: uid,
		  
		 }
  
		for (let i = 0, len = addUserInputsUI.length; i < len; i++) {
  
		  let key = addUserInputsUI[i].getAttribute('data-key');
		  let value = addUserInputsUI[i].value;
		  data[key] = value;
		  
			 
			 var updates = {};
			 updates['/users/' + uid] = data;
		   
		   
		}
		
		firebase.database().ref().update(updates, function () {
		  Swal.fire({
			  
			  icon: 'success',
			  title: 'Your work has been saved',
			  showConfirmButton: false,
			  timer: 1500
			});
		}).then(function sendEmailVerification() {
			  // [START sendemailverification]
			  firebase.auth().currentUser.sendEmailVerification().then(function() {
				// Email Verification sent!
				// [START_EXCLUDE]
				alert('Email Verification Sent!');
				// [END_EXCLUDE]
			  });
			  // [END sendemailverification]
			}
		)
	  
  
	  }
  });
  }
  else {
  
	Swal.fire({
	  icon: 'error',
	  title: 'Oops...',
	  text: 'Something went wrong!',
	  footer: '<a href>Why do I have this issue?</a>'
	})
  }
}; 
  
  







// JS code goes here
'use strict';
        var asc=true;
        document.oncontextmenu = ()=>{return false;};
        document.getElementById('submit').addEventListener('click', function(event) {
            event.preventDefault(); // Prevent form submission

            // Initializing the objects for table and other fields
            var table = document.getElementById("summaryTable").getElementsByTagName('tbody')[0];
            var name=document.getElementById("name").value;
            var mobile=document.getElementById("mobile").value;
            var email=document.getElementById("email").value;
            var rowlen=table.rows.length;
            var errordiv=document.getElementById('error');


            if(checkName(name) && checkMobile(mobile) && checkMail(email))
            {

              //Inserting a new row
              var row = table.insertRow(rowlen);
              var index=0;
              row.innerHTML = "<td>"+name+"</td><td>"+mobile+"</td><td>"+email+"</td><td id=\'delete"+rowlen+"\' class=\'action_delete\'>X</td>";
              //Adding What to do when clicking the delete button
              document.getElementById('delete'+rowlen).addEventListener('click', function(event) {
                //this code executes when delete button (X) next to data in the row is clicked
              this.parentElement.outerHTML=""; //deletes the specific row
              ValidateEntries(); //Validates the number of entries
              }); 
              errordiv.style.visibility = 'hidden'; // Makes Error Strip Invisible

              //Initializing values for fields
              document.getElementById("name").value="";
              document.getElementById("mobile").value="";
              document.getElementById("email").value="";

            }
            else
            {
              if((name==="")&&(email==="")&&(mobile===""))
              {
                errordiv.innerText="All the fields are empty."
              }
              if((name===""))
              {
                errordiv.innerText="Enter the name."
              }
              else{
                 if((mobile===""))
                {
                  errordiv.innerText="Enter the Mobile Number.";
                }
                else
                {
                  if((email===""))
                {
                  errordiv.innerText="Enter the Email ID.";
                }
                }
              }
             
                
              errordiv.style.visibility = 'visible'; // Makes Error Strip Visible
            }
            asc=true;
            document.getElementById("nameColumn").click();
            ValidateEntries(); //Validates the Number of Entries in Table and make changes to UI
        });
        document.getElementById('nameColumn').addEventListener('click', function(event) {
           SortData();
        });

        //Sorts the table data either ascending or descending
        function SortData()
        {
          var table, rows, switching, i, x, y, shouldSwitch;
          table = document.getElementById("summaryTable");
          switching = true;
          
          while (switching) {
          
            switching = false;
            rows = table.rows;
          
            for (i = 1; i < (rows.length - 1); i++) {
          
              shouldSwitch = false;
           
              x = rows[i].getElementsByTagName("TD")[0];
              y = rows[i + 1].getElementsByTagName("TD")[0];
              if(asc==true)
              {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              
                  shouldSwitch = true;
                  break;
                }
              }
              if(asc==false)
              {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              
                  shouldSwitch = true;
                  break;
                }
              }
              
            }
            if (shouldSwitch) {
            
              rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
              switching = true;
            }
          }
          if(asc==true)
          asc=false;
          else
          asc=true;
        }
        function ValidateEntries()
        {
          var entries=document.getElementById("entries");
            var action_column=document.getElementById("action-column");
            if(checkEntries()>0)
            {
              document.getElementById("nocontacts_msg").style.visibility='hidden';
              action_column.style.visibility='visible';
              action_column.style.display='block';
              entries.innerText=checkEntries()+" Entries";
              entries.style.visibility='visible';
            }
            else
            {
              document.getElementById("nocontacts_msg").style.visibility='visible';
              action_column.style.visibility='hidden';
              action_column.style.display='none';
              entries.innerText="No Entries";
              entries.style.visibility='hidden';
            }
        }

        //Checks the number of entries
        function checkEntries(){
          var table = document.getElementById("summaryTable").getElementsByTagName('tbody')[0];
          var rowlen=table.rows.length;
          return rowlen;
        }

        //Validates Email ID
        function checkMail(mail) 
        {
          if(!(String(mail).length<40))
          return false;
          if(String(mail).includes("$")||String(mail).includes("#")||String(mail).includes("!")||String(mail).includes("%")||String(mail).includes("^")||String(mail).includes("&")||String(mail).includes("*")||String(mail).includes("-")||String(mail).includes("+")||String(mail).includes("=")||String(mail).includes("_")||String(mail).includes("`")||String(mail).includes("~"))
            return false;
            else
            return String(mail)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );
              
        } 

        //Validates Mobile Number
        function checkMobile(num)
        {
          if(num.length==10)
            return true;
          else
            return false;
        }
        
        //Validates Name
        function checkName(name) 
        { 
          if (name.length == 0 || name.length > 30) 
            return false; 
          for (let index = 0; index < name.length; ++index) 
          { 
            if ( ! ((name.charCodeAt(index) >= "65" && name.charCodeAt(index) <= "90") || (name.charCodeAt(index) >= "97" && name.charCodeAt(index) <= "123") || name.charCodeAt(index) == 32 )) 
              return false; 
          }
          return true; 
        }
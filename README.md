 # website for people who are looking to adopt a cat or a dog
 ## The Browse Available Pets page
 * displays all of the pets available for adoption

## Find a dog/cat 
Search the user will need to complete the form  which requests the following information
* Cat or dog 
* Breed of dog or cat –  (include a doesn’t matter choice) 
* Preferred age of animal -  can be a choice of age ranges (include a doesn’t matter choice) 
* Preferred gender – Male, female, doesn’t matter choice. 
* Whether it needs to get along with other dogs, other cats, small children.   
* Submit & Clear button
* When the user presses the Submit button, all records of animals that match the criteria in this form are displayed for the potential pet owner to peruse through.

  
## The Dog Care and Cat Care
Offer general instructions on how to care for a dog or cat  

## Create an account
When a user clicks on this menu option, a login creation page loads into the 
content area with text fields for a username and one for a password as 
well as a description of the allowed formats for usernames and 
passwords. A username can contain letters (both upper and lower 
case) and digits only. A password must be at least 4 characters long 
(characters are to be letters and digits only), have at least one letter 
and at least one digit.  Before sending this information to the server 
make sure that the entered username and password satisfy the format 
criteria just listed. As usernames are unique, you need to make sure 
that there isn’t already such a user name in use. If the requested 
username already exists, the server sends back a message requesting 
a new username/password pair informing the user that this username is 
not available. If the username is not already in use, then write this new 
pair to the login file following the format specified in bullet 2 a) and 
return a message to the content area confirming that the account was 
successfully created and that they are now ready to login whenever 
they are ready.  

## The Have a pet to give away
form which the person who has a pet to give up for adoption will need to fill out
user will need to log in to this section of the site to register a pet
* When a user clicks on this menu option, they will first be asked to 
login. The client side needs to make sure that the format of both 
the username and password entered satisfy the criteria listed 
under the bullet Create an account
*  When the user clicks the Submit button, the server will check by 
reading the login file that this login pair exists. If it is a registered 
login/password pair a new session is started and the form is loaded into the content area. If the pair does not exist, a message is send back to the browser 
saying that the login failed. A user can try as many times as they 
want to login.
* Once they have successfully logged in, they are ready to fill out 
the form and submit it.
* Once a form is submitted, the information is added to the 
available pet information file. 


## Cat or dog 
* Breed of dog or cat –  include a mix breed  
* Age of animal - can be a choice of age ranges  
* Animal gender 
* Gets along with other dogs 
* Gets along with other cats 
* Suitable for a family with small children 
* Comment area (textarea) which the user can use to brag about the animal they are putting up for adoption. 
* Their current owner’s name (both family and given name) 
* Their current owner’s email (where they can be reached) 
* Submit & Clear button

## LogOut
* terminates a user’s session

## Contact Us
contact information

"use strict";
/*    JavaScript 7th Edition
      Chapter 8
      Chapter case   

      Draw Poker Game using Object Oriented Programming
      Author:Marcus Wiggs 
      Date:6/4/24       

      Filename:       js08.js
 */

window.addEventListener("load", playDrawPoker);

function playDrawPoker() {
   // Reference buttons and images within the Poker Game page
   let dealButton = document.getElementById("dealB");
   let drawButton = document.getElementById("drawB");
   let standButton = document.getElementById("standB");
   let resetButton = document.getElementById("resetB");
   let statusBox = document.getElementById("status");
   let betSelection = document.getElementById("bet");
   let bankBox = document.getElementById("bank");
   let cardImages = document.querySelectorAll(".cardImg");

   // Set the initial bank value and bet values
   pokerGame.currentBank = 500;
   pokerGame.currentBet = 25;

   // Create a deck of shuffled cards
   let myDeck = new pokerDeck();
   myDeck.shuffle();

   // Create an empty poker hand object
   let myHand = new pokerHand(5);

   // Display the current bank value
   bankBox.value = pokerGame.currentBank;
   
   // Change the bet when the selection changes
   betSelection.onchange = function() {
      pokerGame.currentBet = parseInt(this.value);
   }

      dealButton.addEventListener("click", function() {
      if (pokerGame.currentBank >= pokerGame.currentBet) {
         // Enable the Draw and Stand buttons after the initial deal
         dealButton.disabled = true;        // Turn off the Deal button
         betSelection.disabled = true;      // Turn off the Bet Selection list
         drawButton.disabled = false;       // Turn on the Draw button
         standButton.disabled = false;      // Turn on the Stand Button
         statusBox.textContent = "";        // Erase any status messages

         // Reduce the bank by the size of the bet
         bankBox.value = pokerGame.placeBet();

         // Get a new deck is there are less than 10 cards left
         if (myDeck.cards.length < 10) {
            myDeck = new pokerDeck();
            myDeck.shuffle();
         }

         // Deal 5 cards from the deck to the hand
         myDeck.dealTo(myHand);
         
         // Display the card image on the table
         for (let i = 0; i < cardImages.length; i++) {
            cardImages[i].src = "photo/" + myHand.cards[i].cardImage();

            // Flip the card images when clicked
            cardImages[i].onclick = function() {
               if (this.src.includes("cardback.png")) {
                  // Show the front of the card
                  this.src = myHand.cards[i].cardImage();
               } else {
                  this.src = "photo/cardback.png";
            }
         }
      }

      } else {
         statusBox.textContent = "Insufficient funds!";
      }
   });
   
   
   drawButton.addEventListener("click", function() {
      // Enable the Deal and Bet options when the player chooses to draw new cards
      dealButton.disabled = false;        // Turn on the Deal button
      betSelection.disabled = false;      // Turn on the Bet Selection list
      drawButton.disabled = true;         // Turn off the Draw button
      standButton.disabled = true;        // Turn off the Stand Button
      
      // Replace cards marked to be discarded
      for (let i = 0; i < cardImages.length; i++) {
         if (cardImages[i].src.includes("photo/cardback.png")) {
            myHand.replaceCard(i, myDeck);
            cardImages[i].src = "photo/" + myHand.cards[i].cardImage();
         }
      }

      // Evaluate the hand drawn by user
      statusBox.textContent = myHand.getHandValue();

      // Update the bank value
      bankBox.value = pokerGame.payBet(statusBox.textContent);
   });
   
   
   standButton.addEventListener("click", function() {
      // Enable the Deal and Bet options when the player chooses to stand with their hand 
      dealButton.disabled = false;        // Turn on the Deal button
      betSelection.disabled = false;      // Turn on the Bet Selection list
      drawButton.disabled = true;         // Turn off the Draw button
      standButton.disabled = true;        // Turn off the Stand Button  

      // Evaluate the hand drawn by user
      statusBox.textContent = myHand.getHandValue();
       // Update the bank value
      bankBox.value = pokerGame.payBet(statusBox.textContent);
   
   });
   
   
   // Reload the current page when the Reset button is clicked
   resetButton.addEventListener("click", function() {
      location.reload();
   });
}
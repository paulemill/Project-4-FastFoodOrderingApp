'use strict';

//////////////////////////////////////
//////////////////////////////////////
// Show and Hide the content //
//////////////////////////////////////
//////////////////////////////////////

const burgerCategory = document.querySelector('.category_burger');
const chickenCategory = document.querySelector('.category_chicken');
const dessertCategory = document.querySelector('.category_dessert');

const burgerContainer = document.querySelector('.burgers');
const chickensContainer = document.querySelector('.chickens');
const dessertsContainer = document.querySelector('.desserts');

const hideContent = function () {
  burgerContainer.classList.add('hidden');
  chickensContainer.classList.add('hidden');
  dessertsContainer.classList.add('hidden');
};

burgerCategory.addEventListener('click', function () {
  if (burgerContainer.classList.contains('hidden')) {
    burgerContainer.classList.remove('hidden');
    chickensContainer.classList.add('hidden');
    dessertsContainer.classList.add('hidden');
  } else {
    hideContent();
  }
});

chickenCategory.addEventListener('click', function () {
  if (chickensContainer.classList.contains('hidden')) {
    chickensContainer.classList.remove('hidden');
    burgerContainer.classList.add('hidden');
    dessertsContainer.classList.add('hidden');
  } else {
    hideContent();
  }
});

dessertCategory.addEventListener('click', function () {
  if (dessertsContainer.classList.contains('hidden')) {
    dessertsContainer.classList.remove('hidden');
    burgerContainer.classList.add('hidden');
    chickensContainer.classList.add('hidden');
  } else {
    hideContent();
  }
});

//////////////////////////////////////
//////////////////////////////////////
// Cart total //
// Total amount //
//////////////////////////////////////
//////////////////////////////////////

const cartImages = document.querySelectorAll('.cart_image');
const itemsOrdered = document.querySelector('.items');
const total = document.querySelector('.total');

const viewOrderList = document.querySelector('.orderList');
const orderSummary = document.querySelector('.order_summary');

let totalClick = 0;
let totalAmount = 0;
let orders = [];

// Handle the event where the user click on the cart
cartImages.forEach((cart) => {
  cart.addEventListener('click', function () {
    totalClick++;
    itemsOrdered.textContent = `${totalClick} items on the list`;

    const price = parseFloat(cart.getAttribute('data-price')); //parseFloat converts it to a Number
    const name = cart.getAttribute('data-name');

    totalAmount += price;
    total.textContent = `Total: Php ${totalAmount.toFixed(2)}`;

    orders.push({ name, price }); //store the data to orders array

    updateOrderSummary();
  });
});

function updateOrderSummary() {
  // Set a heading of the order summary
  let summaryHTML = '<h2>Order Summary</h2>';
  // in reference to the event above, loop thru the array using those values
  orders.forEach((order, index) => {
    summaryHTML += `
      <div class="order_item" data-index="${index}">
        <span class="cancel_item"><button>X</button></span>
        <span class="order_name">${order.name}</span>
        <span class="order_price">Php ${order.price.toFixed(2)}</span>
      </div>
    `;
  });

  orderSummary.innerHTML = summaryHTML;

  // Add event listeners to cancel buttons
  const cancelButtons = document.querySelectorAll('.cancel_item button');

  cancelButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
      const orderItem = e.target.closest('.order_item'); // get the element that contains .order_item
      const index = orderItem.getAttribute('data-index'); // retrieve the data-index

      orders.splice(index, 1); // Remove the item from the orders array using the retrieved index

      // Recalculate totalClick and totalAmount
      totalClick = orders.length;
      totalAmount = orders.reduce((sum, order) => sum + order.price, 0);

      // Update the display
      itemsOrdered.textContent = `${totalClick} items on the list`;
      total.textContent = `Total: Php ${totalAmount.toFixed(2)}`;

      updateOrderSummary(); // Update the order summary
    });
  });
}

// Show / hide the orderlist
viewOrderList.addEventListener('click', function () {
  if (orderSummary.classList.contains('hidden')) {
    orderSummary.classList.remove('hidden');
  } else {
    orderSummary.classList.add('hidden');
  }
});

// checkout button

// clear all orders
function clearOrders() {
  orders = [];
  totalClick = 0;
  totalAmount = 0;
  itemsOrdered.textContent = `${totalClick} items on the list`;
  total.textContent = `Total: Php ${totalAmount.toFixed(2)}`;
  updateOrderSummary();
}

const checkoutButton = document.querySelector('.checkout_btn');
checkoutButton.addEventListener('click', function () {
  let payment = prompt(`Please pay Php ${totalAmount.toFixed(2)}`);
  if (payment < totalAmount) {
    alert('Invalid, try again.. ');
  } else if (payment > totalAmount) {
    alert(
      `Thank you! Here is your change Php ${(payment - totalAmount).toFixed(2)}`
    );
    clearOrders();
  } else {
    alert(`Thank you!`);
    clearOrders();
  }
});

const cancelButton = document.querySelector('.cancel_btn');
cancelButton.addEventListener('click', function () {
  let cancelValue = prompt(`Are you sure? (Yes or No)`).toLowerCase().trim();
  if (cancelValue === 'yes') {
    clearOrders();
    alert(`Order cancelled..`);
  } else if (cancelValue !== 'yes' && cancelValue !== 'no') {
    alert('Invalid Input');
  }
});

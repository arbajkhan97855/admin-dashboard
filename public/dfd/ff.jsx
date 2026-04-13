<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mobile Product | Shop</title>

  <!-- Google Font -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: "Inter", sans-serif;
    }

    body {
      background: #f1f3f6;
      color: #212121;
    }

    /* ===== LAYOUT ===== */
    .container {
      max-width: 1200px;
      margin: 20px auto;
      display: flex;
      gap: 20px;
    }

    /* ===== LEFT IMAGE SECTION ===== */
    .product-images {
      width: 40%;
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      position: sticky;
      top: 20px;
      height: fit-content;
    }

    .main-image img {
      width: 100%;
      border-radius: 6px;
    }

    .thumbnail-list {
      display: flex;
      gap: 10px;
      margin-top: 15px;
    }

    .thumbnail-list img {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
    }

    /* ===== RIGHT DETAILS ===== */
    .product-details {
      width: 60%;
      background: #fff;
      padding: 25px;
      border-radius: 8px;
    }

    .product-title {
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    .rating {
      color: #388e3c;
      font-size: 14px;
      margin-bottom: 12px;
    }

    .price-box {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 15px;
    }

    .price {
      font-size: 28px;
      font-weight: 700;
    }

    .old-price {
      text-decoration: line-through;
      color: #878787;
    }

    .discount {
      color: #388e3c;
      font-weight: 600;
    }

    /* ===== OFFERS ===== */
    .offers {
      background: #f9f9f9;
      padding: 15px;
      border-radius: 6px;
      margin-bottom: 20px;
    }

    .offers h4 {
      margin-bottom: 10px;
      font-size: 16px;
    }

    .offers li {
      font-size: 14px;
      margin-bottom: 6px;
    }

    /* ===== BUTTONS ===== */
    .action-buttons {
      display: flex;
      gap: 15px;
      margin: 20px 0;
    }

    .btn {
      flex: 1;
      padding: 14px;
      border: none;
      font-size: 16px;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
    }

    .btn-cart {
      background: #ff9f00;
      color: #fff;
    }

    .btn-buy {
      background: #fb641b;
      color: #fff;
    }

    /* ===== HIGHLIGHTS ===== */
    .highlights h4 {
      margin-bottom: 10px;
    }

    .highlights ul li {
      font-size: 14px;
      margin-bottom: 6px;
    }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 900px) {
      .container {
        flex-direction: column;
      }

      .product-images,
      .product-details {
        width: 100%;
      }
    }
  </style>
</head>
<body>

  <div class="container">

    <!-- LEFT IMAGE SECTION -->
    <div class="product-images">
      <div class="main-image">
        <img src="https://via.placeholder.com/450x500" alt="Mobile">
      </div>

      <div class="thumbnail-list">
        <img src="https://via.placeholder.com/100">
        <img src="https://via.placeholder.com/100">
        <img src="https://via.placeholder.com/100">
        <img src="https://via.placeholder.com/100">
      </div>
    </div>

    <!-- RIGHT DETAILS -->
    <div class="product-details">
      <h1 class="product-title">
        Samsung Galaxy S23 5G (Phantom Black, 128 GB)
      </h1>

      <p class="rating">⭐ 4.4 | 18,234 Ratings</p>

      <div class="price-box">
        <span class="price">₹49,999</span>
        <span class="old-price">₹69,999</span>
        <span class="discount">28% off</span>
      </div>

      <!-- OFFERS -->
      <div class="offers">
        <h4>Available Offers</h4>
        <ul>
          <li>💳 Bank Offer: 10% off on HDFC Cards</li>
          <li>🔁 Exchange Offer: Up to ₹15,000 off</li>
          <li>🚚 Free Delivery</li>
        </ul>
      </div>

      <!-- ACTION BUTTONS -->
      <div class="action-buttons">
        <button class="btn btn-cart">Add to Cart</button>
        <button class="btn btn-buy">Buy Now</button>
      </div>

      <!-- HIGHLIGHTS -->
      <div class="highlights">
        <h4>Highlights</h4>
        <ul>
          <li>8 GB RAM | 128 GB ROM</li>
          <li>6.1 inch Full HD+ Display</li>
          <li>50MP + 12MP + 10MP Camera</li>
          <li>3900 mAh Battery</li>
          <li>Snapdragon 8 Gen Processor</li>
        </ul>
      </div>
    </div>

  </div>

</body>
</html>

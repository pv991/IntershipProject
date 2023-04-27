import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';

const data = [
  {
    image: require("./image/1.jpg"),
    caption: "Caption",
    description: "Description Here",
  },
  {
    image: require("./image/2.jpg"),
    caption: "Caption",
    description: "Description Here",
  },
  {
    image: require("./image/3.jpg"),
    caption: "Caption",
    description: "Description Here",
  },
  {
    image: require("./image/4.jpg"),
    caption: "Caption",
    description: "Description Here",
  },
  {
    image: require("./image/5.jpg"),
    caption: "Caption",
    description: "Description Here",
  },
  {
    image: require("./image/6.jpg"),
    caption: "Caption",
    description: "Description Here",
  },
];
function Home() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  var imgstyle = {
    height: "400px",
  };
  return (
    <>
      <div>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {data.map((slide, i) => {
            return (
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={slide.image}
                  alt="slider image"
                />
                <Carousel.Caption>
                  <h3>{slide.caption}</h3>
                  <p>{slide.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
        <div className="container">
          <div className="row">
            <div className="col-6 mt-5 mb-5">
              <img
                className="ms-auto me-auto"
                src={require("./image/vagitable.jpg")}
                height="400px"
                width="100%"
                style={imgstyle}
              />
            </div>
            <div className="col-6 mt-5 mb-5">
              <img
                className="ms-auto me-auto"
                src={require("./image/grocery.jpg")}
                height="400px"
                width="100%"
                style={imgstyle}
              />
            </div>
          </div>
          <div className="about">
            <h2 className="text-success h2">online grocery store</h2>
            <blockquote className="mt-2 content">
              onlinestore believes in providing the highest level of customer
              service and is continuously innovating to meet customer
              expectations. Our On-time Guarantee is one such assurance where we
              refund 10% of the bill value if the delivery is delayed. For all
              your order values above Rs. 1000, we provide free delivery. A wide
              range of imported and gourmet products are available through our
              express delivery and slotted delivery service. If you ever find an
              item missing on delivery or want to return a product, you can
              report it to us within 48 hours for a ‘no-questions-asked’ refund.
              Best quality products for our quality-conscious customers.
              onlinestore is synonymous with superior quality and continues to
              strive for higher levels of customer trust and confidence, by
              taking feedback and giving our customers what they want. We have
              added the convenience of pre-cut fruits in our Fresho range. If
              it’s a product category you’re looking to shop from, we’ve made it
              convenient for you to access all products in a section easily. For
              instance, if you’re looking for beverages, you can order from a
              long list of beverages that include cool drinks, hot teas, fruit
              juices and more. We are proud to be associated closely with the
              farmers from whom we source our fresh products. Most of our
              farm-fresh products are sourced directly from farmers, which not
              only ensures the best prices and freshest products for our
              customers but also helps the farmers get better prices. With more
              than 80 Organic Fruits and Vegetables and a wide range of organic
              staples, bigbasket has the largest range in the organic products
              category. When it comes to payment, we have made it easy for our
              customers can pay through multiple payment channels like Credit
              and Debit cards, Internet Banking, e-wallets and Sodexo passes or
              simply pay Cash on Delivery (COD).The convenience of shopping for
              home and daily needs, while not compromising on quality, has made
              onlinestore the online supermarket of choice for thousands of
              happy customers across India.
            </blockquote>
          </div>
          <div className="Bankoffers">
            <h2 className="text-center text-success mt-5 h2">Bank Offers</h2>
            <hr />
            <div className="offercard mt-5 mb-5">
              <div className="row">
                <div className="col-3">
                  <img src={require("./image/offer1.jpg")} width="100%" />
                </div>
                <div className="col-3">
                  <img src={require("./image/offer2.jpg")} width="100%" />
                </div>
                <div className="col-3">
                  <img src={require("./image/offer3.jpg")} width="100%" />
                </div>
                <div className="col-3">
                  <img src={require("./image/offer4.jpg")} width="100%" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

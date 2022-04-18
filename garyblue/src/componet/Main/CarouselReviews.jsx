import React, { useEffect } from "react";
import { useState } from "react";
import { Carousel as CarouselReviews } from "react-responsive-carousel";
import classes from "./CarouselReviews.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';


//Loading reviews from Firebase DB

function StoreReviews() {
  const starIcon = <FontAwesomeIcon icon={faStar} />;
  const starHalfIcon = <FontAwesomeIcon icon={faStarHalf} />;


  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(
        "https://react-http-f1a28-default-rtdb.firebaseio.com/reviews.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();

      const loadedReviews = [];

      for (const key in responseData) {
        loadedReviews.push({
          id: key,
          date: responseData[key].date,
          name: responseData[key].name,
          rating: responseData[key].rating,
          review: responseData[key].review,
        });
      }
      setReviews(loadedReviews);
      setIsLoading(false);
    };

    fetchReviews().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section>
        <p>{httpError}</p>
      </section>
    );
  }

  return (

    <CarouselReviews autoPlay infiniteLoop interval={9000} showThumbs={false} showStatus={false} showArrows={false} showIndicators={false} >
        
      {reviews.map((review) => (
          <div className={classes.reviews}>
          <div className={`${classes.bold} ${classes.reviewStars}`}> {review.rating}/5 <br /> <span className={classes.starColor}>{starIcon}{starIcon}{starIcon}{starIcon}{starIcon}</span> </div>
              <div className={classes.currentReview}>
                <div className={classes.bold}> {`${review.name}, ${review.date}`} </div>
              <div>
              {review.review}
            </div>
            </div>
          </div>
         ))}
    </CarouselReviews>

  );
  };

export default StoreReviews;
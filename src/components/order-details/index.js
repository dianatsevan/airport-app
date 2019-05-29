import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { FaCheck, FaRegUserCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';
import moment from 'moment';
import HorizontalStepper from '../stepper';
import { fetchPaymentData } from '../../redux/payment/actions';
import './index.scss';

function OrderDetails({
  requestInfo, selectedFlight, returnSelectedFlight, history, fetchPaymentD, paymentD,
}) {
  OrderDetails.propTypes = {
    requestInfo: PropTypes.object.isRequired,
    selectedFlight: PropTypes.object.isRequired,
    returnSelectedFlight: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    fetchPaymentD: PropTypes.func.isRequired,
    paymentD: PropTypes.string.isRequired,
  };

  const flights = requestInfo.twoWayRequest ? [selectedFlight, returnSelectedFlight] : [selectedFlight];
  const { adult, child, infant } = requestInfo;
  const passengersAmount = adult + child + infant;

  const getTicketPrice = passengersInfo => passengersInfo.reduce((total, { luggagePrice: price }) => total + price, 0);

  const goToPaymentPage = () => {
    // history.push('/payment');
    const create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: 'http://return.url',
        cancel_url: 'http://cancel.url',
      },
      transactions: [{
        item_list: {
          items: [{
            name: 'item',
            sku: 'item',
            price: '1.00',
            currency: 'USD',
            quantity: 1,
          }],
        },
        amount: {
          currency: 'USD',
          total: '1.00',
        },
        description: 'This is the payment description.',
      }],
    };

    fetchPaymentD(create_payment_json);
    window.location = paymentD;
  };

  return (
    <>
      <HorizontalStepper activeStep={2} />
      <section className="order-details">
        <div className="order-details-wrapper">
          {flights.map(({
            date, fromCountry, toCountry, startTime, endTime, price, passengersInfo,
          }, index) => (
            <div key={index} className={flights.length === 1 ? 'one-ticket' : 'two-tickets'}>
              <section className="order-details__flight">
                <div className="order-details__header">
                  <FaCheck className="order-details__icon" />
                  <span className="order-details__text">Flight</span>
                </div>

                <div className="flight-info">
                  <span className="flight-info__date">{moment(date).format('MMM Do')}</span>
                  <div className="flight-info__wrapper">
                    <span className="flight-info__direction">{fromCountry} - {toCountry}</span>
                    <span className="flight-info__time">{moment(startTime).format('LT')} - {moment(endTime).format('LT')}</span>
                  </div>
                </div>

                <div className="about-price">
                  <span className="about-price__text">{passengersAmount} x Flight ticket</span>
                  <span className="about-price__amount">$ {price * passengersAmount}</span>
                </div>
              </section>

              <section className="order-details__passengers">
                <div className="order-details__header">
                  <FaCheck className="order-details__icon" />
                  <span className="order-details__text">Passengers</span>
                </div>

                {passengersInfo.map((passenger, i) => (
                  <div className="passengers-info" key={i}>
                    <div className="passengers-info__about">
                      <FaRegUserCircle className="passengers-info__icon" />
                      <span className="passengers-info__name">{passenger.firstname} {passenger.lastname}</span>
                    </div>

                    <div className="about-price">
                      <span className="about-price__text">Luggage {passenger.luggageKg === 0 ? '' : ` - ${passenger.luggageKg} kg`}</span>
                      <span className="about-price__amount">$ {passenger.luggagePrice}</span>
                    </div>

                    <div className="about-price">
                      <span className="about-price__text">Seat - {passenger.selectedSeat}</span>
                      <span className="about-price__amount">included</span>
                    </div>
                  </div>
                ))}
              </section>

              <section className="order-details__total-price">
                <span className="total-price__text">Total</span>
                <span className="total-price__amount">$ {price * passengersAmount + getTicketPrice(passengersInfo)}</span>
              </section>
            </div>
          ))}
        </div>

        <button type="button" className="button" onClick={goToPaymentPage}>Confirm</button>
      </section>
    </>
  );
}

const mapStateToProps = state => ({
  requestInfo: state.user.requestInfo.request,
  selectedFlight: state.user.selectedFlight,
  returnSelectedFlight: state.user.returnSelectedFlight,
  paymentD: state.payment.paymentData,
});

const mapDispatchToProps = dispatch => ({
  fetchPaymentD: paymentObj => dispatch(fetchPaymentData(paymentObj)),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(OrderDetails);

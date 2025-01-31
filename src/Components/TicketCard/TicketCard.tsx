import React, { FC } from 'react';
import { TicketCardType } from 'types';
import { getDepartureTime, getConvertMinutesToTime } from '../../utilites';
import styles from './TicketCard.module.css';

export const TicketCard: FC<TicketCardType> = ({ ticket }) => {
  const { price, segments, carrier } = ticket;

  return (
    <div className={styles.conteiner}>
      <div className={styles.priceAndLogoConteiner}>
        <p>{price} руб.</p>
        <img src={`//pics.avs.io/0/${carrier}.png`} />
      </div>

      <>
        {segments.map((item, index) => {
          return (
            <div className={styles.info} key={index}>
              <div className={styles.flightData}>
                <p>{`${item.origin} - ${item.destination}`}</p>
                <p>{getDepartureTime(item.date, item.duration)}</p>
              </div>

              <div className={styles.flightData}>
                <p>В ПУТИ</p>
                <p>{getConvertMinutesToTime(item.duration)}</p>
              </div>

              <div className={styles.flightData}>
                <p> пересадок: {item.stops.length} </p>
                <p> {item.stops.length !== 0 ? item.stops.join(', ') : '-'}</p>
              </div>
            </div>
          );
        })}
      </>
    </div>
  );
};

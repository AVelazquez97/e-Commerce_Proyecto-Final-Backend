import { PERSISTENCY } from '../../config/index.js';
import { LoggerWarn } from '../../config/log4.js';
import DAOFactory from '../../persistency/DAO/DAOFactory.js';
import normalizeMessages from '../../utils/normalizer/normalizeMessages.js';

let messageDAO;

(async () => {
  try {
    messageDAO = await DAOFactory.getPersistency('messages', PERSISTENCY);
    return messageDAO;
  } catch (error) {
    throw `${error}`;
  }
})();

export default async (io, socket) => {
  try {
    socket.on('set-email', async (email) => {
      try {
        /* ------------------------ carga inicial de mensajes ----------------------- */
        socket.emit(
          'view-private-messages',
          normalizeMessages(await messageDAO.readMsgsByEmail(email))
        );
      } catch (error) {
        LoggerWarn.warn(error);
        io.sockets.emit('view-private-messages', { error });
      }
    });
  } catch (error) {
    LoggerWarn.warn(error);
    socket.emit('set-email-error', error.message);
  }

  /* ------------------------ actualizacion de mensajes ----------------------- */
  socket.on('new-private-message', async (msg, email) => {
    try {
      msg.fyh = new Date().toLocaleString();
      await messageDAO.insertMsg(msg);

      io.sockets.emit(
        'view-private-messages',
        normalizeMessages(await messageDAO.readMsgsByEmail(email))
      );
    } catch (error) {
      LoggerWarn.warn(error);
      io.sockets.emit('view-private-messages', { error });
    }
  });
};

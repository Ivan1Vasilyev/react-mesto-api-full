import '../index.css';
import { useEffect, useState, useCallback } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Page from './Page';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import ConfirmationPopup from './ConfirmationPopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import PageNotFound from './PageNotFound';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { PopupOnLoadContext } from '../contexts/PopupOnLoadContext';
import * as api from '../utils/api.js';
import { uxWrap, handleError } from '../utils/utils';
import { ROUTE_SIGN_UP, ROUTE_SIGN_IN, ROUTE_MAIN } from '../utils/constants';

const App = () => {
  const [isEditProfilePopupOpen, setEditProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = useState(false);
  const [isImagePopupOpen, setImagePopup] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [textLoading, setTextLoading] = useState('');
  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isTooltipOnError, setIsTooltipOnError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmCallback, setConfirmCallback] = useState({ confirm: null });
  const history = useHistory();

  const closeAllPopups = useCallback(() => {
    setSelectedCard({});
    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setImagePopup(false);
    setConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }, []);

  const openEditAvatarPopup = useCallback(() => setEditAvatarPopup(true), []);
  const openEditProfilePopup = useCallback(() => setEditProfilePopup(true), []);
  const openAddPlacePopup = useCallback(() => setAddPlacePopup(true), []);
  const openDeleteCardPopup = useCallback(id => {
    setConfirmPopupOpen(true);
    setConfirmCallback({ confirm: () => handleDeleteCard(id) });
  }, []);
  const openLogOutPopup = useCallback(() => {
    setConfirmPopupOpen(true);
    setConfirmCallback({ confirm: () => onSignOut(currentUser._id) });
  }, [currentUser._id]);

  const showFullImageClick = useCallback(({ link, name }) => {
    setImagePopup(true);
    setSelectedCard({ link, name });
  }, []);

  const handleUpdateUser = useCallback(
    userData =>
      uxWrap(setTextLoading, async () => {
        try {
          const { name, about } = await api.editUserData(userData);
          setCurrentUser(state => ({ ...state, name, about }));
          closeAllPopups();
        } catch (err) {
          handleError(err, 'Ошибка обновления данных пользователя.');
        }
      }),
    []
  );

  const handleUpdateAvatar = useCallback(
    newAvatar =>
      uxWrap(setTextLoading, async () => {
        try {
          const { avatar } = await api.setUserAvatar(newAvatar);
          setCurrentUser(state => ({ ...state, avatar }));
          closeAllPopups();
        } catch (err) {
          handleError(err, 'Ошибка обновления аватара пользователя.');
        }
      }),
    []
  );

  const handleAddPlace = useCallback(
    placeData =>
      uxWrap(setTextLoading, async () => {
        try {
          const newCard = await api.addCard(placeData);
          setCards(state => [...state, newCard]);
          closeAllPopups();
        } catch (err) {
          handleError(err, 'Ошибка добавления новой карточки.');
        }
      }),
    []
  );

  const handleCardLike = useCallback(async (cardId, isLiked) => {
    try {
      const updatedCard = await api.toggleLike(cardId, isLiked);
      setCards(state => state.map(c => (c._id === cardId ? updatedCard : c)));
    } catch (err) {
      handleError(err, 'Ошибка загрузки данных лайка карточки.');
    }
  }, []);

  const handleDeleteCard = useCallback(
    cardId =>
      uxWrap(
        setTextLoading,
        async () => {
          try {
            await api.deleteCard(cardId);
            setCards(state => state.filter(c => c._id !== cardId));
            closeAllPopups();
          } catch (err) {
            handleError(err, 'Ошибка удаления карточки.');
          }
        },
        'Удаление...'
      ),
    []
  );

  const checkToken = useCallback(async () => {
    try {
      const user = await api.getUserInfo();
      setEmail(user.email);
      setLoggedIn(true);
    } catch (err) {
      handleError(err, 'Ошибка проверки токена');
    }
  }, []);

  const onLogin = useCallback(
    userData =>
      uxWrap(
        setTextLoading,
        async () => {
          try {
            await api.login(userData);
            await checkToken();
          } catch (err) {
            const errorMessage = await handleError(err);
            setIsTooltipOnError(true);
            setIsInfoTooltipOpen(true);
            setErrorMessage(errorMessage);
          }
        },
        'Вход...'
      ),
    []
  );

  const onRegister = useCallback(userData => {
    uxWrap(
      setTextLoading,
      async () => {
        try {
          const res = await api.register(userData);
          if (res) {
            setIsTooltipOnError(false);
            setIsInfoTooltipOpen(true);
            history.push(ROUTE_SIGN_IN);
          }
        } catch (err) {
          const errorMessage = await handleError(err);
          setIsTooltipOnError(true);
          setIsInfoTooltipOpen(true);
          setErrorMessage(errorMessage);
        }
      },
      'Регистрация...'
    );
  }, []);

  const onSignOut = useCallback(
    id =>
      uxWrap(
        setTextLoading,
        async () => {
          try {
            await api.logout(id);
            setLoggedIn(false);
            closeAllPopups();
          } catch (err) {
            handleError(err, 'Ошибка выхода из профиля');
          }
        },
        'Выход...'
      ),
    []
  );

  useEffect(() => {
    if (loggedIn) {
      const loadDefaultData = async () => {
        try {
          const [userInfo, defaultCards] = await api.loadDefaultData();
          setCurrentUser({ ...userInfo });
          setCards([...defaultCards]);
        } catch (err) {
          handleError(err, 'Ошибка загрузки начальных данных.');
        }
      };
      loadDefaultData();
    }
  }, [loggedIn]);

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <Page>
      <CurrentUserContext.Provider value={currentUser}>
        <PopupOnLoadContext.Provider value={textLoading}>
          <Header email={email} loggedIn={loggedIn} onSignOut={openLogOutPopup} />
          <Switch>
            <ProtectedRoute
              component={Main}
              loggedIn={loggedIn}
              path={ROUTE_MAIN}
              onEditAvatar={openEditAvatarPopup}
              onEditProfile={openEditProfilePopup}
              onAddPlace={openAddPlacePopup}
              showFullImageClick={showFullImageClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={openDeleteCardPopup}
            />
            <Route path={ROUTE_SIGN_IN}>
              <Login name="login" loggedIn={loggedIn} onSubmit={onLogin} />
            </Route>
            <Route path={ROUTE_SIGN_UP}>
              <Register name="register" loggedIn={loggedIn} onSubmit={onRegister} />
            </Route>
            <Route exact path="/">
              {loggedIn ? <Redirect to={ROUTE_MAIN} /> : <Redirect to={ROUTE_SIGN_IN} />}
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
          <Footer />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            onError={isTooltipOnError}
            errorMessage={errorMessage}
          />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ConfirmationPopup isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onSubmit={confirmCallback.confirm} />
          <ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} card={selectedCard} />
        </PopupOnLoadContext.Provider>
      </CurrentUserContext.Provider>
    </Page>
  );
};

export default App;

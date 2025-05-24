import { renderHook, act } from '@testing-library/react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCardSaga,
  loadInitialCardsSaga,
  toggleFreezeCardSaga,
} from '../../store/slices/cardSlice';
import { useCards } from '../useCards';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { cards } from '../../api/dummyData';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('@gorhom/bottom-sheet', () => ({
  __esModule: true,
  default: {
    close: jest.fn(),
  },
}));

describe('useCards', () => {
  const mockDispatch = jest.fn();
  const mockSelector = jest.fn();

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockImplementation(mockSelector);

    mockSelector.mockImplementation((callback) =>
      callback({
        card: {
          cards: cards,
          loading: true,
          error: undefined,
          addCardLoading: false,
          addCardError: undefined,
          freezeCardLoading: false,
          freezeCardError: undefined,
        },
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch cards on mount', () => {
    renderHook(() => useCards());

    expect(mockDispatch).toHaveBeenCalledWith(loadInitialCardsSaga());
  });

  it('should handle card scrolling and update current visible card', () => {
    const { result } = renderHook(() => useCards());

    act(() => {
      result.current.onScroll({
        nativeEvent: {
          contentOffset: { x: 375 },
        },
      } as NativeSyntheticEvent<NativeScrollEvent>);
    });

    expect(result.current.currentVisibleCard).toBe(1);
    expect(result.current.currentVisibleCardData).toEqual({
      ...cards[1],
    });
  });

  it('should add a new card', () => {
    const { result } = renderHook(() => useCards());

    act(() => {
      result.current.addNewCard('New Card');
    });

    expect(mockDispatch).toHaveBeenCalledWith(addCardSaga('New Card'));
  });

  it('should toggle freeze card status', () => {
    const { result } = renderHook(() => useCards());

    act(() => {
      result.current.onPressFreezeCard(true, '1');
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      toggleFreezeCardSaga({ id: '1', freeze: true })
    );
  });

  it('should not toggle freeze if no cardId provided', () => {
    const { result } = renderHook(() => useCards());

    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

    act(() => {
      result.current.onPressFreezeCard(true);
    });
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should handle loading and error states', () => {
    mockSelector.mockImplementation((callback) =>
      callback({
        card: {
          cards: [],
          loading: true,
          error: 'Failed to load cards',
          addCardLoading: true,
          addCardError: 'Failed to add card',
          freezeCardLoading: false,
          freezeCardError: undefined,
        },
      })
    );

    const { result } = renderHook(() => useCards());

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe('Failed to load cards');
    expect(result.current.addCardLoading).toBe(true);
    expect(result.current.addCardError).toBe('Failed to add card');
  });
});

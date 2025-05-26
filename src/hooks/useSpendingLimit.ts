import { useDispatch, useSelector } from 'react-redux';
import {
  updateSpendingLimitSaga,
  updateSpendingLimitSuccess,
} from '../store/slices/cardSlice';
import { useEffect, useMemo, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { RootState } from '../store/store';
import { validateSpendingAmount } from '../utils/cardUtils';

export const useSpendingLimit = () => {
  const { spendingLimitLoading, spendingLimitSuccess } = useSelector(
    (state: RootState) => state.card
  );

  const dispatch = useDispatch();
  const {
    params: { currentVisibleCardData },
  } = useRoute<RouteProp<RootStackParamList, 'ADD_SPENDING_LIMIT'>>();

  const navigation = useNavigation();

  const [limit, setLimit] = useState(
    currentVisibleCardData.maxLimit.toString()
  );

  const validateSpendingLimit = useMemo(
    () => validateSpendingAmount(limit, currentVisibleCardData),
    [currentVisibleCardData, limit]
  );

  const updateSpendingLimit = () => {
    dispatch(
      updateSpendingLimitSaga({
        id: currentVisibleCardData.id,
        spendingLimit: parseInt(limit, 10),
      })
    );
  };

  useEffect(() => {
    if (spendingLimitSuccess) {
      navigation.goBack();
    }

    return () => {
      dispatch(updateSpendingLimitSuccess(false));
    };
  }, [spendingLimitSuccess, navigation, dispatch]);

  return {
    updateSpendingLimit,
    setLimit,
    validateSpendingLimit,
    limit,
    spendingLimitLoading,
  };
};

import { useState, useCallback } from "react";

// 유효성 검사 Custom Hook
export const useValidation = () => {
  const [errors, setErrors] = useState({});

  const validate = useCallback((values) => {
    let newErrors = {};

    if (values.productName.length < 1 || values.productName.length > 10) {
      newErrors.productName = "10자 이내로 입력해주세요";
    }

    if (
      values.productDescription.length < 10 ||
      values.productDescription.length > 100
    ) {
      newErrors.productDescription = "10자 이상 입력해주세요";
    }

    if (!values.productPrice || isNaN(values.productPrice)) {
      newErrors.productPrice = "숫자로 입력해주세요";
    }

    if (values.productTags.some((tag) => tag.length > 5)) {
      newErrors.productTags = "5글자 이내로 입력해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, []); // 의존성 배열 비워두기

  return { errors, validate };
};

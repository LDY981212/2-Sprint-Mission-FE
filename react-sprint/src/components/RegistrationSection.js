import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useValidation } from "../hooks/useValidation";
import "./RegistrationSection.css";
import xImg from "../assets/xImg.svg";

export default function RegistrationSection() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productTags, setProductTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [tagError, setTagError] = useState("");
  const navigate = useNavigate();
  const { errors, validate } = useValidation();

  useEffect(() => {
    const isValid =
      validate({
        productName,
        productDescription,
        productPrice,
        productTags,
      }) &&
      productName &&
      productDescription &&
      productPrice &&
      productTags.length > 0;
    setIsFormValid(isValid);
  }, [productName, productDescription, productPrice, productTags, validate]);

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (!tagInput) {
        setTagError("태그를 입력해주세요.");
        return;
      }

      if (tagInput.length > 5) {
        setTagError("5글자 이내로 입력해주세요"); // 5글자 초과에 대한 에러 메시지
        return;
      }

      setProductTags((prevTags) => [...prevTags, tagInput]);
      setTagInput("");
      setTagError(""); // 에러 초기화
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const productData = {
      name: productName,
      description: productDescription,
      price: productPrice,
      tags: productTags,
    };

    try {
      const response = await fetch(
        "https://two-sprint-mission-be-ss9z.onrender.com/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        navigate(`/registration/${result._id}`);
      } else {
        console.log("상품 등록에 실패했습니다.");
      }
    } catch (err) {
      console.log("에러 발생", err);
    }
  };

  return (
    <section className="registerSection">
      <form onSubmit={handleSubmit} className="registerForm">
        <label className="registerLabel" id="register">
          <h2>상품 등록하기</h2>
          <button
            type="submit"
            className={isFormValid ? "abledBtn" : ""}
            disabled={!isFormValid}
          >
            등록
          </button>
        </label>
        <label className="registerLabel">
          <h3>상품명</h3>
          <input
            type="text"
            name="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="상품명을 입력해주세요"
            className={errors.productName ? "error" : ""}
          />
          {errors.productName && (
            <p className="errorMessage">{errors.productName}</p>
          )}
        </label>
        <label className="registerLabel">
          <h3>상품 소개</h3>
          <input
            id="introductionInput"
            type="text"
            name="productIntroduction"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="상품 소개를 입력해주세요"
            className={errors.productDescription ? "error" : ""}
          />
          {errors.productDescription && (
            <p className="errorMessage">{errors.productDescription}</p>
          )}
        </label>
        <label className="registerLabel">
          <h3>판매가격</h3>
          <input
            type="text"
            name="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder="판매 가격을 입력해주세요"
            className={errors.productPrice ? "error" : ""}
          />
          {errors.productPrice && (
            <p className="errorMessage">{errors.productPrice}</p>
          )}
        </label>
        <label className="registerLabel" id="tagLabel">
          <h3>태그</h3>
          <input
            type="text"
            name="productTage"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="태그를 입력해주세요"
            onKeyDown={handleTagKeyDown}
          />
          {tagError && <p className="errorMessage">{tagError}</p>}
          {productTags.map((tag, index) => (
            <div key={index} className="tagChip">
              #{tag}
              <img src={xImg} alt="xImg" />
            </div>
          ))}
        </label>
      </form>
    </section>
  );
}

const getLabel = (count: number, multiple: boolean) => {
  if (count > 0)
    return `${count}개의 파일 선택됨${multiple ? " - 클릭하여 추가" : ""}`;
  return multiple ? "상세 이미지 추가" : "이미지 추가";
};
export default getLabel;

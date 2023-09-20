
function checkProfile() {

    // 아이디 검사
    const uid = document.getElementsByName("uid")[0];
    if (uid.value == "") {
        alert("아이디를 입력하세요.");
        uid.focus();
        return false;
    };

    const idRegExp = /^[a-zA-z0-9]{4,12}$/;
    if (!idRegExp.test(uid.value)) {
        alert("아이디는 영문 대소문자와 숫자 4~12자리로 입력해야 합니다!");
        uid.focus();
        uid.value = "";
        return false;
    }

    // 비밀번호 검사
    const pwd = document.getElementsByName("password")[0];
    const pwds = document.getElementsByName("passwords")[0];

    if (pwd.value == "") {
        alert("비밀번호를 입력하세요.");
        pwd.focus();
        return false;
    };

    const pwdCheck = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{4,12}$/;

    if (!pwdCheck.test(pwd.value)) {
        alert("비밀번호는 영문자+숫자+특수문자 조합으로 4~12자리 사용해야 합니다.");
        pwd.focus();
        pwd.value="";
        return false;
    }

    if(pwd.value != pwds.value){
    alert("비밀번호가 일치하지 않습니다.");
    pwds.focus();
    pwds.value="";
    return false;
  }

  // 이메일 검사
  const mailAddress = document.getElementsByName("emails")[0];

  if (mailAddress.value == "") {
      alert("이메일을 입력하세요.");
      mailAddress.focus();
      return false;
  };


  const mailAddressPattern = /^[a-zA-Z0-9_]+[a-zA-Z0-9]*[@]{1}[a-zA-Z0-9]+[a-zA-Z0-9]*[.]{1}[A-Za-z]{1,3}$/;
  if (!mailAddressPattern.test(mailAddress.value)) {
      alert("올바른 메일 주소를 입력해주세요. 예) id@domain.com");
      mailAddress.value = "";
      mailAddress.focus();
      return false;
  }


    // 이름 검사
    const userName = document.getElementsByName("name")[0];
    if (userName.value == "") {
        alert("이름을 입력하세요.");
        userName.focus();
        return false;
    };

    const nameRegExp = /^[가-힣]{2,4}$/;

    if (!nameRegExp.test(userName.value)) {
        alert("이름이 올바르지 않습니다.");
        userName.focus();
        userName.value = "";
        return false;
    }

    // 주민번호 검사
    const useInfo = document.getElementsByName("specificNum")[0];
    if (useInfo.value == "") {
        alert("주민번호를 입력하세요.");
        useInfo.focus();
        return false;
    };

    const userInfoRegExp = /^[0-9]{6,6}[-]{1,1}[0-9]{7,7}$/;

    if (!userInfoRegExp.test(useInfo.value)) {
        alert("주민번호가 올바르지 않습니다. \nex) 123456-1234567");
        useInfo.focus();
        useInfo.value = "";
        return false;
    }

     // 관심 분야 검사
     const favorites = document.getElementsByName("con");
     let selectedFavorites = 0;
     for (let i = 0; i < favorites.length; i++) {
         if (favorites[i].checked) {
             selectedFavorites++;
         }
     }
     if (selectedFavorites < 1) {
         alert("관심 분야를 하나 이상 선택해주세요.");
         return false;
     }

     const selfIntroduction = document.querySelector("textarea").value.trim();
     if (selfIntroduction.length < 3) {
         alert("자기 소개를 3자 이상 작성해주세요.");
         document.querySelector("textarea").focus();
         return false;
     }

    alert("회원가입이 완료되었습니다!");
    window.location.href = `mailto:${mailAddress.value}?subject=회원가입 완료&body=회원가입을 환영합니다.`;
    return true;

}


function numCheck() {
    // 주민번호 검사
    const specificNum = document.getElementsByName("specificNum")[0];
    const juminNumber = specificNum.value.replace("-", ""); // 하이픈 제거
    const arrNum = juminNumber.split('');
    const checkNum = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];   // 주민번호 첫 자리부터 숫자를 각각 곱해서 더하기 위한 용도 

    for (var i = 0; i < arrNum.length - 1; i++) {
        arrNum[i] = arrNum[i] * checkNum[i];
    }

    var sum = 0;

    for (var i = 0; i < 12; i++) {
        sum += arrNum[i];
    }

    if ((11 - (sum % 11)) % 10 != arrNum[12]) {    // 다 더한 체크넘 변수를 11로 나눈 나머지를 11로 빼고 10으로 나눈 나머지값을 구함
        alert("올바른 주민번호가 아닙니다.");
        specificNum.value = "";
        specificNum.focus();
        return false;
    } else {
        const year = document.getElementsByName("year")[0];
        const month = document.getElementsByName("month")[0];
        const day = document.getElementsByName("day")[0];

        const birthYear = parseInt(juminNumber.substring(0, 2));

        if (birthYear >= 00 && birthYear <= 23) {
            year.value = "20" + birthYear;
        } else {
            year.value = "19" + birthYear;
        }

        const birthMonth = parseInt(juminNumber.substring(2, 4));
        const birthDay = parseInt(juminNumber.substring(4, 6));

        month.value = birthMonth;
        day.value = birthDay;
    }
}


// 주소를 불러오기 위함.
function searchAddress(){
    new daum.Postcode({
        oncomplete: function(data) {
            var addr = ''; // 주소 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementsByName('address1')[0].value = data.zonecode;
            document.getElementsByName("address2")[0].value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementsByName("address3")[0].focus();
        }
    }).open();
}




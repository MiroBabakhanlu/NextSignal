import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { colorContext } from '../../Context/ColorContextProvider';



const About = () => {

  const { config } = useContext(colorContext);

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);

  const header2 = 'شکلات‌های دست‌ساز، سالم و سفارشی با طعم‌های منحصر به فرد';

  const description = `در فروشگاه آنلاین شکلات ما، شما می‌توانید شکلات‌های دست‌ساز، سالم و سفارشی را با طعم‌های منحصر به فرد و استفاده از بهترین مواد اولیه پیدا کنید. ما به تولید شکلات‌هایی می‌پردازیم که نه تنها طعمی فوق‌العاده دارند، بلکه از نظر کیفیت و ارزش غذایی نیز بی‌نظیر هستند. 
  ما به شکلات‌های سفارشی برای مناسبت‌های خاص مانند تولدها، اعیاد، جشن‌ها و هر لحظه ویژه‌ای که بخواهید به یادگار بماند، اختصاص داریم. 
  تمامی محصولات ما ارگانیک و بدون مواد شیمیایی یا افزودنی‌های مضر هستند تا شما بتوانید از شکلات‌های ما بدون نگرانی لذت ببرید. 
  از انتخاب طعم‌ها و طرح‌های متنوع گرفته تا بسته‌بندی‌های شیک و زیبا، همه چیز با دقت و حساسیت خاصی طراحی و تولید می‌شود تا بهترین تجربه شکلاتی را برای شما فراهم آورد. 
  هدف ما این است که شما را در هر قدم از انتخاب تا تجربه لذت‌بخش شکلات با بالاترین کیفیت همراهی کنیم.`;
  
  const faq = {
    1: {
      q: 'آیا شکلات‌های شما سالم و ارگانیک هستند؟',
      a: 'بله، تمامی شکلات‌های ما با استفاده از مواد ارگانیک و طبیعی تولید می‌شوند. ما به سلامت شما اهمیت می‌دهیم و از هیچ‌گونه مواد شیمیایی یا افزودنی‌های مضر استفاده نمی‌کنیم.',
    },
  
    2: {
      q: 'آیا می‌توانم شکلات‌ها را به صورت بسته‌بندی‌های هدیه سفارش دهم؟',
      a: 'بله، شما می‌توانید شکلات‌ها را در بسته‌بندی‌های هدیه سفارشی دریافت کنید. ما انواع بسته‌بندی‌های شیک و جذاب برای مناسبت‌های مختلف مثل تولد، اعیاد و جشن‌ها ارائه می‌دهیم.',
    },
  
    3: {
      q: 'آیا شکلات‌های شما برای گیاه‌خواران مناسب هستند؟',
      a: 'بله، بسیاری از شکلات‌های ما به طور خاص برای گیاه‌خواران تولید شده‌اند. ما به شما این اطمینان را می‌دهیم که می‌توانید با خیال راحت از شکلات‌های ما لذت ببرید، بدون اینکه نگران مواد غیرمجاز باشید.',
    },
  
    4: {
      q: 'آیا امکان بازگشت محصولات وجود دارد؟',
      a: 'بله، در صورتی که مشکلی با سفارش خود داشته باشید، می‌توانید درخواست بازگشت محصول دهید. ما تضمین می‌کنیم که تجربه خریدی رضایت‌بخش را برای شما فراهم کنیم.',
    },
  };
  

  return (
    <Container theme={config}>
      <AboutSection theme={config}>
        <h1>درباره ما / سوالات متداول</h1>
        <h2>
          {header2}   <span>"نام فروشگاه"</span>
        </h2>
        <p>
          {description}
        </p>
      </AboutSection>

      <FAQSection theme={config}>
        <Dropdown theme={config} onClick={() => setShow(!show)}>
          <h1>{faq[1].q}</h1>
          <Answer theme={config} show={show}>
            <p>
              {faq[1].a}
            </p>
          </Answer>
        </Dropdown>

        <Dropdown theme={config} onClick={() => setShow2(!show2)}>
          <h1>{faq[2].q}</h1>
          <Answer theme={config} show={show2}>
            <p>
              {faq[2].a}
            </p>
          </Answer>
        </Dropdown>

        <Dropdown theme={config} onClick={() => setShow3(!show3)}>
          <h1>{faq[3].q}</h1>
          <Answer theme={config} show={show3}>
            <p>
              {faq[3].a}
            </p>
          </Answer>
        </Dropdown>

        <Dropdown theme={config} onClick={() => setShow4(!show4)}>
          <h1>{faq[4].q}</h1>
          <Answer theme={config} show={show4}>
            <p>
              {faq[4].a}
            </p>
          </Answer>
        </Dropdown>
      </FAQSection>
    </Container>
  );
};


const Container = styled.div`
  width: 100%;
  height: fit-content;
  /* background-color: ${({ theme }) => theme.bg}; */
  background-color: ${({ theme }) => theme.mainBg};
  padding-top: 50px;
  text-align: right;
  overflow: hidden;
  padding-bottom: 70px;
  margin-top: 100px;
  display: flex;
  flex-direction: row;


  @media screen and (max-width: 991px) {
    padding-top: 100px;
    /* margin-top: 50px; */
    margin: 0px;
    display: flex;
   flex-direction: column;

  }
`;

const AboutSection = styled.div`
  width: 100%;
  height: fit-content;
  word-wrap:wrap;
  // background-color: ${({ theme }) => theme.aboutSection};

  h1 {
    font-size: 14px;
    /* color: ${({ theme }) => theme.aboutSectionH1}; */
    color: ${({ theme }) => theme.titile1};
    padding: 20px 0px 0px 20px;
    line-height: 0px;

    @media screen and (max-width: 991px) {
      font-size: 12px;
      padding: 20px 50px 0px 20px;
    }
  }

  h2 {
    font-size: 33px;
    /* color: ${({ theme }) => theme.aboutSectionH2}; */
    color: ${({ theme }) => theme.titile2};
    padding: 20px 0px 0px 20px;
    line-height: 50px;

    @media screen and (max-width: 991px) {
      font-size: 24px;
    padding: 20px 50px 0px 20px;

    }
  }

  p {
    padding: 20px 0px 70px 70px;
    font-size: 15px;
    /* color: ${({ theme }) => theme.aboutSectionP}; */
    color: ${({ theme }) => theme.description};
    line-height: 35px;

    @media screen and (max-width: 991px) {
      padding: 20px 50px 0px 20px; 
      font-size: 13px;
      line-height: 1.8;
    }
  }
`;

const FAQSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  transition: 1.5s ease;
  // background-color: ${({ theme }) => theme.faq};
  padding-top: 25px;
  padding-bottom: 25px;
  flex-wrap: wrap;
`;

const Dropdown = styled.div`
  width: 90%;
  height: fit-content;
  background-color: ${({ theme }) => theme.dropDown};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 9px;
  transition: all 0.1s ease-in;
  cursor: pointer;

  h1 {
    /* color: ${({ theme }) => theme.dropdownH1}; */
    color: ${({ theme }) => theme.titile1};
    font-size: 15px;
    padding: 30px;
    line-height: 25px;
    text-align: center;
    margin: auto;
    transition: all 0.3s ease-in;
    display: block;
    width: 100%;

    &:hover {
      /* color: ${({ theme }) => theme.dropDownH1}; */
      color: ${({ theme }) => theme.titile1};
    }

    @media screen and (max-width: 991px) {
      font-size: 14px;
      padding: 8px;
    }
  }

  @media screen and (max-width: 991px) {
    width: 80%;
    padding: 10px;
  }
`;

const Answer = styled.div`
  max-height: ${({ show }) => (show ? '500px' : '0')};
  opacity: ${({ show }) => (show ? '1' : '0')};
  overflow: hidden;
  transition: max-height 0.6s ease-in-out, padding 0.6s ease-in-out, opacity 0.3s ease-in-out;
  padding: ${({ show }) => (show ? '10px' : '0 10px')};
  background-color: ${({ theme }) => theme.answer};
  border-radius: 15px;
  // padding: 15px;
  p {
    color: ${({ theme }) => theme.answerP};
    text-align: center;
    line-height: 25px;
  }

    @media screen and (max-width: 375px) {
    font-size: 14px;
  }
`;


export default About;

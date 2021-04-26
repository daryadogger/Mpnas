const accordion = () => {
  const $accordions = $(`.accordion__item`);
  if ($accordions) {
    $accordions.each(function() {
      const $thiss = $(this);
      const $side = $thiss.find(`.accordion__label`);
      const $main = $thiss.find(`.accordion__content`);

      $side.on(`click`, (evt) => {
        evt.preventDefault();

        if ($side.hasClass(`is-open`)) {
          $main.slideUp("slow");
          $side.removeClass(`is-open`);
          $side.blur();
        } else {
          $side.addClass(`is-open`);
          $main.slideDown("slow");
        }
      });
    });
  }

  const $innerAccordions = $(`.accordion-inner__item`);
  if ($innerAccordions) {
    $innerAccordions.each(function() {
      const $thiss = $(this);
      const $side = $thiss.find(`.accordion-inner__label`);
      const $main = $thiss.find(`.accordion-inner__content`);

      $side.on(`click`, (evt) => {
        evt.preventDefault();

        if ($side.hasClass(`is-open`)) {
          $main.slideUp("slow");
          $side.removeClass(`is-open`);
          $side.blur();
        } else {
          $side.addClass(`is-open`);
          $main.slideDown("slow");
        }
      });
    });
  }


};

export default accordion;

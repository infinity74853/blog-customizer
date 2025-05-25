import { useState, useRef } from 'react';
import { useOutsideClickClose } from 'src/components/select/hooks/useOutsideClickClose';
import { ArrowButton } from 'src/components/arrow-button';
import { Button } from 'src/components/button';
import { Form } from 'src/components/form/Form';
import { Select } from 'src/components/select';
import { RadioGroup } from 'src/components/radio-group';
import { Separator } from 'src/components/separator';
import { Text } from 'src/components/text';
import { clsx } from 'clsx';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [tempStyles, setTempStyles] = useState(currentArticleState);
	const formRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef: formRef,
		onChange: setIsOpen,
	});

	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		setCurrentArticleState(tempStyles);
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setTempStyles(defaultArticleState);
		setCurrentArticleState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				ref={formRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleApply}
					onReset={handleReset}>
					<Form>
						<Text size={31} weight={800}>
							ЗАДАЙТЕ ПАРАМЕТРЫ
						</Text>
						<Select
							selected={tempStyles.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(selected) =>
								setTempStyles({ ...tempStyles, fontFamilyOption: selected })
							}
							title='Шрифт'
						/>

						<RadioGroup
							name='font-size'
							options={fontSizeOptions}
							selected={tempStyles.fontSizeOption}
							onChange={(selected) =>
								setTempStyles({ ...tempStyles, fontSizeOption: selected })
							}
							title='Размер шрифта'
						/>

						<Select
							selected={tempStyles.fontColor}
							options={fontColors}
							onChange={(selected) =>
								setTempStyles({ ...tempStyles, fontColor: selected })
							}
							title='Цвет шрифта'
						/>

						<Separator />

						<Select
							selected={tempStyles.backgroundColor}
							options={backgroundColors}
							onChange={(selected) =>
								setTempStyles({ ...tempStyles, backgroundColor: selected })
							}
							title='Цвет фона'
						/>

						<Select
							selected={tempStyles.contentWidth}
							options={contentWidthArr}
							onChange={(selected) =>
								setTempStyles({ ...tempStyles, contentWidth: selected })
							}
							title='Ширина контента'
						/>
					</Form>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

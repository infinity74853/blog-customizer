import { useState, useRef } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
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
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [tempStyles, setTempStyles] = useState(currentArticleState);
	const formRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isSidebarOpen,
		rootRef: formRef,
		onChange: setIsSidebarOpen,
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
			<ArrowButton
				isOpen={isSidebarOpen}
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}
			/>
			<aside
				ref={formRef}
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleApply}
					onReset={handleReset}>
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

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

dest="./.vscode"
src="./.etc/.vscode"
define vscode
	@$(call print_message, "$(shell pwd)"); \
	$(call print_message, "$(current_work_directory)"); \
	if [ ! -d "${dest}" ]; then \
		$(call print_message, "creating .vscode directory", "warn"); \
		mkdir "${dest}"; \
	fi; \
	for file in "${src}"/*; do \
		filename=$$(basename "$$file"); \
		dest_ln="${dest}/$$filename"; \
		if [ -e "$$dest_ln" ]; then \
			$(call print_message, "🗑️  removing old symbolic link for $$filename", "warn"); \
			rm "$$dest_ln"; \
		fi; \
		$(call print_message, "🔗 adding $$filename"); \
		cp "$$file" "$$dest_ln"; \
	done
endef
